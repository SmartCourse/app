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
     * Get all of dem comments for a specific comment
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
     * Put a comment - i.e. update the body
     * @param {number}  id    The id of the comment
     * @param {object}  body  object containing comment data including
                              user id and body of the comment
     */
    putComment(id, { userID, body }) {
        return this.db
            .run(`UPDATE ${COMMENTS}
                    SET body=@body
                    WHERE userID=@userID AND id=@id`,
            {
                [COMMENTS]: { userID, body, id }
            })
    }

    /**
     * Delete a comment and its answers (although answering comments isn't yet supported...).
     * @param {number}  id      The id of the comment
     * @param {object}  userID  The id of the user
     */
    deleteComment(id, userID) {
        // The query does an implicit auth check with userID before deleting
        return this.db
            .run(`BEGIN TRANSACTION;
                    IF EXISTS (SELECT * FROM ${COMMENTS} WHERE userID=@userID AND id=@id)
                      DELETE ${COMMENTS}
                        WHERE commentParent=@commentParent OR id=@id;
                  COMMIT;`,
            {
                [COMMENTS]: { userID, id, commentParent: id }
            })
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
