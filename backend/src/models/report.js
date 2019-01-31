const { TABLE_NAMES: { REPORTS, USERS, DEGREES } } = require('./constants')
const { APIError } = require('../utils/error')

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
                errors: [{ code: 1002, message: 'Report must have a reason' }]
            })
        }

        return this.db
            .run(`INSERT INTO ${REPORTS} (${key}, reason, userID)
                VALUES (@${key}, @reason, @userID);
                SELECT @@identity AS id`,
            {
                [REPORTS]: { [key]: value, reason, userID }
            })
            .then(([{ id }]) => id)
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
