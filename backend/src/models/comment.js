const { TABLE_NAMES: { COMMENTS, USERS } } = require('./constants')

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
            .insert(COMMENTS, { [key]: value, body, userID })
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
            .queryAll(`SELECT
                u.id as userID,
                u.displayName,
                u.degree,
                u.gradYear,
                u.description,
                u.picture,
                u.reputation,
                u.joined,
                c.*
                FROM
                ${COMMENTS} as c
                JOIN
                ${USERS} as u
                    on (
                        c.userID=u.id
                    )
                WHERE
                (
                    c.${key}=?
                ) ;
        `, [value])
    }

    getComment(id) {
        return this.db
            .query(`SELECT
                u.id as userID,
                u.displayName,
                u.degree,
                u.gradYear,
                u.description,
                u.picture,
                u.reputation,
                u.joined,
                c.*
                FROM
                ${COMMENTS} as c
                JOIN
                ${USERS} as u
                    on (
                        c.userID=u.id
                    )
                WHERE
                (
                    c.id=?
                ) ;
        `, [id])
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
module.exports = async function (db) {
    if (!db) {
        /* app environment, dev or prod */
        const db = await require('./db')()
        return (Singleton = Singleton ? Singleton : new Comment(db)) // eslint-disable-line
    }
    /* to allow injection */
    return new Comment(db)
}
