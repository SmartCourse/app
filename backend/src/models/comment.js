/* All inputs should be validated in this class that are comment related */
class Comment {
    constructor(db) {
        console.log('initialising ORM Comment object')
        this.db = db
    }

    /**
     * Post a new comment
     * @param   {object} queryID
     * @param   {number} pageNumber
     * @returns {Array}
     */
    postComment(queryID, { body, userID = 1 }) {
        const [ key, value ] = Object.entries(queryID)[0]
        return this.db
            .insert('comment', { [key]: value, body, userID })
            /* Still not sure on this, seems wasteful to send all new data */
            .then(() => this.getComments(queryID, 1))
    }

    /**
     * // TODO - PAGING
     * Get all of dem comments for a specific question
     * @param   {object} queryID
     * @param   {number} pageNumber
     * @returns {Array}
     */
    getComments(queryID, pageNumber = 1) {
        const [ key, value ] = Object.entries(queryID)[0]
        return this.db
            .queryAll(`SELECT * FROM comment WHERE ${key}=?`, [value])
    }

    editComment() {
        return Promise.resolve(true)
    }
}

let Singleton = null

/**
 * @param {object} db defaults to the db instance
 */
module.exports = function(db) {
    if (!db) {
        /* app environment, dev or prod */
        return (Singleton = Singleton ? Singleton : new Comment(require('./db'))) // eslint-disable-line
    }
    /* to allow injection */
    return new Comment(db)
}
