const { TABLE_NAMES: { COMMENTS, USERS, DEGREES }, PERM_MOD } = require('./constants')
const { APIError, toSQLErrorCode, translateSQLError } = require('../utils/error')

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

        // validation
        if (!body) {
            const type = key === 'questionID' ? 'answer' : 'comment'
            throw new APIError({
                status: 400,
                code: 1002,
                message: `Invalid ${type}`,
                errors: [{ code: 6002, message: `${type} must have a body` }]
            })
        }

        // TODO validate question/reviewID
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
            // TODO: check parent object exists and 404 if not
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
            .then(([row]) => {
                if (row) return row
                throw new APIError({ status: 404, code: 6001, message: 'The comment does not exist' })
            })
    }

    /**
     * Put a comment - i.e. update the body
     * @param {number}  id    The id of the comment
     * @param {object}  body  object containing comment data including
                              user id, permission level and body of the comment
     */
    putComment(id, { userID, permissions, body }) {
        return this.db
            .run(`IF NOT EXISTS(SELECT * FROM ${COMMENTS} WHERE id=@id)
                      THROW ${toSQLErrorCode(6001)}, 'The comment does not exist', 1;
                  IF ${permissions} < ${PERM_MOD} AND NOT EXISTS (SELECT * FROM ${COMMENTS} WHERE userID=@userID AND id=@id)
                      THROW ${toSQLErrorCode(1003)}, 'You cannot edit this comment', 1;
                  ELSE
                      UPDATE ${COMMENTS}
                      SET body=@body
                      WHERE userID=@userID AND id=@id;`,
            {
                [COMMENTS]: { userID, body, id }
            })
            .catch(translateSQLError({ [toSQLErrorCode(6001)]: 404, [toSQLErrorCode(1003)]: 403 }))
    }

    /**
     * Delete a comment and its answers (although answering comments isn't yet supported...).
     * @param {number}  id          The id of the comment
     * @param {number}  permissions The permission level of the user
     * @param {object}  userID      The id of the user
     */
    deleteComment(id, permissions, userID) {
        // The query does an implicit auth check with userID before deleting
        // TODO: throw proper errors
        return this.db
            .run(`IF NOT EXISTS(SELECT * FROM ${COMMENTS} WHERE id=@id)
                      THROW ${toSQLErrorCode(6001)}, 'The comment does not exist', 1;
                  IF ${permissions} < ${PERM_MOD} AND NOT EXISTS (SELECT * FROM ${COMMENTS} WHERE userID=@userID AND id=@id)
                      THROW ${toSQLErrorCode(1003)}, 'You cannot delete this comment', 1;
                  ELSE
                      DELETE ${COMMENTS}
                      WHERE commentParent=@commentParent OR id=@id;`,
            {
                [COMMENTS]: { userID, id, commentParent: id }
            })
            .catch(translateSQLError({ [toSQLErrorCode(6001)]: 404, [toSQLErrorCode(1003)]: 403 }))
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
