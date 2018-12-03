const { TABLE_NAMES: { LIKES, USERS, QUESTIONS, REVIEWS, COMMENTS } } = require('./constants')

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
            .query(`SELECT SUM(value) as sum FROM ${LIKES}
            WHERE objectType=@objectType AND objectID=@objectID`,
            { objectType: type, objectID: id }, LIKES)
            .then(([{ sum }]) => ({ likes: sum || 0 }))
    }

    /*
     * Get likes for a specific user
     */
    getUserLiked({ type, id, userID }) {
        return this.db
            .query(`SELECT value AS userLiked FROM ${LIKES}
            WHERE objectType=@objectType AND objectID=@objectID AND userID=@userID`,
            { objectType: type, objectID: id, userID }, LIKES)
            .then(([{ userLiked = 0 } = {}]) => ({ userLiked }))
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
        const updateLikes = `REPLACE INTO ${LIKES} (${insertColumns}) VALUES (${insertPlaceholders})`

        // Stuff to update reputation
        const creatorTable = (type === QUESTIONS || type === REVIEWS) ? type : COMMENTS
        const updateReputation = `UPDATE ${USERS}
        SET reputation = (SELECT reputation FROM ${USERS} WHERE id = ?) + ?
        WHERE id = ?`

        // Classic
        return Promise.all([
            this.db.query(`SELECT * FROM ${LIKES} WHERE objectType=? AND objectID=? AND userID=?`,
                [type, id, userID]),
            this.db.query(`SELECT userID FROM ${creatorTable} WHERE id = ?`,
                [id])
        ])
            .then(([originalLike, creator]) => {
                const oldLike = (originalLike && originalLike.value) || 0
                const creatorID = creator.userID
                const repChange = creatorID !== userID ? (value - oldLike) : 0
                return Promise.all([
                    this.db.query(updateLikes, [...insertValues]),
                    this.db.query(updateReputation, [creatorID, repChange, creatorID])
                ])
                    .then(() => this.getLikes({ type, id }))
            })
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
