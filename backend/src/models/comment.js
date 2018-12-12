const { TABLE_NAMES: { COMMENTS, USERS, DEGREES } } = require('./constants')

/* All inputs should be validated in this class that are comment related */
class Comment {
    constructor(db) {
        console.log('initialising ORM Comment object')
        this.db = db
    }

    /**
     * Post a new comment
     * @param   {object} queryObject   Contains the type of id and its value
     * @param   {number} pageNumber
     * @returns {Array}
     */
    postComment(queryObject, { body, userID }) {
        const [key, value] = Object.entries(queryObject)[0]
        return this.db
            .run(`INSERT INTO ${COMMENTS} (${key}, body, userID)
                VALUES (@${key}, @body, @userID);
                SELECT @@identity AS id`,
            {
                [COMMENTS]: { [key]: value, body, userID }
            })
            .then(([{ id }]) => id)
    }

    /**
     * // TODO - PAGING
     * Get all of dem comments for a specific question
     * @param   {object} queryObject
     * @param   {number} pageNumber
     * @returns {Array}
     */
    getComments(queryObject, pageNumber = 1) {
        const [key, value] = Object.entries(queryObject)[0]
        return this.db
            .run(`SELECT u.id AS userID, u.displayName, u.gradYear,
                u.description, u.picture, u.reputation, u.joined,
                c.*, d.name AS degree
                FROM ${COMMENTS} AS c

                JOIN ${USERS} AS u
                ON c.userID=u.id
                JOIN ${DEGREES} AS d
                ON u.degreeID = d.id
                
                WHERE c.${key}=@${key}`,
            {
                [COMMENTS]: { [key]: value }
            })
    }

    getComment(id) {
        return this.db
            .run(`SELECT u.id AS userID, u.displayName, u.gradYear,
                u.description, u.picture, u.reputation, u.joined,
                c.*, d.name AS degree
                FROM ${COMMENTS} AS c

                JOIN ${USERS} AS u
                ON c.userID=u.id
                JOIN ${DEGREES} AS d
                ON u.degreeID = d.id
                
                WHERE c.id=@id`,
            {
                [COMMENTS]: { id }
            })
            .then(([row]) => row || {})
    }

    /**
     * Edit a comment
     * @param {number} id           Id of the comment to be edited
     * @param {object} data         Relevant fields that need to be updated
     */
    editComment(id, data) {
        return Promise.resolve({ id, data })
    }
}

let Singleton = null

/**
 * @param {object} db defaults to the db instance
 */
module.exports = function (db) {
    if (!db) {
        /* app environment, dev or prod */
        return (Singleton = Singleton ? Singleton : new Comment(require('./db'))) // eslint-disable-line
    }
    /* to allow injection */
    return new Comment(db)
}
