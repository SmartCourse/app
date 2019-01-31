const { TABLE_NAMES: { REPORTS, USERS, DEGREES, QUESTIONS, REVIEWS, COMMENTS } } = require('./constants')
const { APIError, toSQLErrorCode, translateSQLError } = require('../utils/error')

/* All inputs should be validated in this class that are report related */
class Report {
    constructor(db) {
        console.log('initialising ORM Report object')
        this.db = db
    }

    /**
     * Post a new report
     * @param   {object} queryObject   Contains the type of id and its value
     * @returns {number} id of report
     */
    postReport(queryObject, { reason, userID }) {
        const [key, value] = Object.entries(queryObject)[0]

        // validation
        if (!reason) {
            throw new APIError({
                status: 400,
                code: 1002,
                message: 'Invalid reason',
                errors: [{ code: 8002, message: 'Report must have a reason' }]
            })
        }

        // TODO user hasn't posted a report for that post already...
        return this.db
            .run(`IF EXISTS(SELECT * FROM ${REPORTS} WHERE ${key}=@${key} AND userID=@userID)
                      THROW ${toSQLErrorCode(8003)}, 'You can''t report this post twice!', 1;
                  ELSE
                      BEGIN
                          INSERT INTO ${REPORTS} (${key}, reason, userID)
                          VALUES (@${key}, @reason, @userID);
                          SELECT @@identity AS id
                      END`,
            {
                [REPORTS]: { [key]: value, reason, userID }
            })
            .then(([{ id }]) => id)
            .catch(translateSQLError({ [toSQLErrorCode(8003)]: 400 }))
    }

    /**
     * Get all of dem reports for a given post
     * @param   {object} queryObject
     * @returns {Array}
     */
    getReports(queryObject) {
        const [key, value] = Object.entries(queryObject)[0]
        return this.db
            .run(`SELECT u.id AS userID, u.displayName, u.gradYear,
                u.description, u.picture, u.reputation, u.joined,
                r.*, d.name AS degree
                FROM ${REPORTS} AS r

                JOIN ${USERS} AS u
                ON r.userID=u.id
                JOIN ${DEGREES} AS d
                ON u.degreeID = d.id

                WHERE r.${key}=@${key}`,
            {
                [REPORTS]: { [key]: value }
            })
    }

    /**
     * Group all reports by post id, join with the post itself
     * TODO: pagination
     * @param   {number} pageNumber
     * @returns {Array}
     */
    getAllReports(pageNumber = 1) {
        return this.db
            .run(`SELECT COUNT(r.id) AS numReports,
                r.questionID, r.reviewID, r.commentID,
                (IF r.questionID THEN q.title ELSE IF r.reviewID then re.title ELSE NULL) as title
                FROM ${REPORTS} AS r
                JOIN ${QUESTIONS} as q ON r.questionID=q.id
                JOIN ${REVIEWS} as re ON r.reviewID=re.id
                JOIN ${COMMENTS} as c ON r.commentID=c.id

                GROUP BY questionID, reviewID, commentID
                ORDER BY numReports DESC`,
            {})
    }
}

let Singleton = null

/**
 * @param {object} db defaults to the db instance
 */
module.exports = function (db) {
    if (!db) {
        /* app environment, dev or prod */
        return (Singleton = Singleton ? Singleton : new Report(require('./db'))) // eslint-disable-line
    }
    /* to allow injection */
    return new Report(db)
}
