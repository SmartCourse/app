/* All inputs should be validated in this class that are likes related */
class Likes {
    constructor(db) {
        console.log('initialising ORM Likes object')
        this.db = db
    }

    /*
     * Get question likes
     */
    getLikes({ type, id }) {
        return this.db
            .query('SELECT SUM(value) FROM like WHERE objectType=? AND objectID=?',
                [type, id])
            .then((sum) => {
                const likes = sum['SUM(value)'] ? sum['SUM(value)'] : 0
                return { likes }
            })
    }

    /*
     * Put question likes
     */
    putLikes({ type, id, userID, value }) {
        return this.db
            .insertUnique('like', {
                objectType: type,
                objectID: id,
                userID,
                value
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
