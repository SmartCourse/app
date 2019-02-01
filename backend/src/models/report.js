const { TABLE_NAMES: { REPORTS, USERS, DEGREES, QUESTIONS, REVIEWS, COMMENTS, COURSES } } = require('./constants')
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
    postReport(queryObject, code, { reason, userID }) {
        // validation
        if (!reason) {
            throw new APIError({
                status: 400,
                code: 1002,
                message: 'Invalid reason',
                errors: [{ code: 8002, message: 'Report must have a reason' }]
            })
        }

        const commentID = queryObject.commentID
        delete queryObject.commentID
        // all reports have either a questionID or reviewID
        const [topKey, topValue] = Object.entries(queryObject)[0]
        console.log(`topKey: ${topKey}, topValue: ${topValue}`)

        return this.db
            .run(`IF EXISTS(SELECT * FROM ${REPORTS} WHERE ${topKey}=@${topKey} AND ${commentID ? 'commentID=@commentID' : 'commentID IS NULL'} AND userID=@userID)
                      THROW ${toSQLErrorCode(8003)}, 'You''ve already reported this post', 1;
                  INSERT INTO ${REPORTS} (courseID, ${topKey}, commentID, reason, userID)
                      SELECT id, @${topKey}, ${commentID ? '@commentID' : 'NULL'}, @reason, @userID
                      FROM ${COURSES}
                      WHERE code=@code;
                  SELECT @@identity AS id`,
            {
                [REPORTS]: { [topKey]: topValue, reason, userID, commentID },
                [COURSES]: { code }
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
                d.name AS degree,
                r.id, r.reason, r.reviewed, r.timestamp
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
    getReportSummary(pageNumber = 1) {
        // TODO this query looks gross - if there's a cleaner way then plz change it
        // TODO this query may perform poorly at scale, in which case the JOIN's are not strictly necessary, they're just there to make the frontend's life easier
        return this.db
            .run(`SELECT COUNT(r.id) AS numReports,
                (CASE
                  WHEN r.commentID IS NOT NULL
                    THEN 'comment'
                  WHEN r.questionID IS NOT NULL
                    THEN 'question'
                  ELSE 'review'
                END) AS parentType,

                r.questionID,
                r.reviewID,
                r.commentID,

                (CASE
                  WHEN r.commentID IS NOT NULL
                    THEN NULL
                  WHEN r.questionID IS NOT NULL
                    THEN q.title
                  ELSE re.title
                END) AS title,

                (CASE
                  WHEN r.commentID IS NOT NULL
                    THEN c.body
                  WHEN r.questionID IS NOT NULL
                    THEN q.body
                  ELSE re.body
                END) AS body,

                cou.code

                FROM ${REPORTS} AS r
                LEFT OUTER JOIN ${QUESTIONS} as q ON r.questionID=q.id
                LEFT OUTER JOIN ${REVIEWS} as re ON r.reviewID=re.id
                LEFT OUTER JOIN ${COMMENTS} as c ON r.commentID=c.id
                LEFT OUTER JOIN ${COURSES} as cou ON r.courseID=cou.id

                GROUP BY r.questionID, r.reviewID, r.commentID, q.title, re.title, q.body, re.body, c.body, cou.code
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
