/* All inputs should be validated in this class that are likes related */
class Likes {
    constructor(db) {
        console.log('initialising ORM Likes object')
        this.db = db
    }

    /*
     * Get likes
     */
    getLikes({ type, id }) {
        return this.db
            .query('SELECT SUM(value) FROM likes WHERE objectType=? AND objectID=?',
                [type, id])
            .then((sum) => {
                const likes = sum['SUM(value)'] ? sum['SUM(value)'] : 0
                return { likes }
            })
    }

    /*
     * Get likes for a specific user
     */
    getUserLiked({ type, id, userID }) {
        return this.db
            .query('SELECT value AS userLiked FROM likes WHERE objectType=? AND objectID=? AND userID=?',
                [type, id, userID])
            .then((userLiked) => {
                return userLiked || { userLiked: 0 }
            })
    }

    /*
     * Put likes
     */
    putLikes({ type, id, userID, value }) {

        // Stuff to update likes
        const data = {
            objectType: type,
            objectID: id,
            userID,
            value
        }
        const insertValues = Object.values(data)
        const insertColumns = Object.keys(data)
        const insertPlaceholders = insertColumns.map(_ => '?').join()
        const updateLikes = `REPLACE INTO likes (${insertColumns}) VALUES (${insertPlaceholders})`

        // Stuff to update reputation
        const creatorTable = (type === 'question' || type === 'review') ? type : 'comment'
        const updateReputation = `UPDATE user
        SET reputation = (SELECT reputation FROM user WHERE id = ?) + ?
        WHERE id = ?`

        // Classic
        const db = this.db._db
        return new Promise((resolve, reject) => {
            Promise.all([
                this.db.query('SELECT * FROM likes WHERE objectType=? AND objectID=? AND userID=?',
                    [type, id, userID]),
                this.db.query(`SELECT userID FROM ${creatorTable} WHERE id = ?`,
                    [id])
            ])
                .then(([originalLike, creator]) => {
                    const oldLike = originalLike && originalLike.value || 0
                    const creatorID = creator.userID
                    const repChange = creatorID != userID ? (value - oldLike) : 0
                    db.serialize(function() {
                        db.exec('BEGIN TRANSACTION')
                            .run(updateLikes, [...insertValues])
                            .run(updateReputation, [creatorID, repChange, creatorID])
                            .exec('COMMIT', () => resolve(this.lastID))
                    })
                })
        })
            .then(() => this.getLikes({ type, id }))
    }
}

let Singleton = null

/**
 * @param {object} db defaults to the db instance
 */
module.exports = function(db) {
    if (!db) {
        /* app environment, dev or prod */
        return (Singleton = Singleton ? Singleton : new Likes(require('./db'))) // eslint-disable-line
    }
    /* to allow injection */
    return new Likes(db)
}
