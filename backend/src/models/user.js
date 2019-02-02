const { TABLE_NAMES: { USERS, DEGREES } } = require('./constants')
const { APIError, toSQLThrow, ERRORS } = require('../error')

/* All inputs should be validated in this class that are User related */
class User {
    constructor(db) {
        console.log('initialising ORM User object')
        this.db = db
    }

    /**
     * Return specialised information for auth'd user
     * @param   {string} id The id of the auth'd user
     * @returns {object}    profile information
     */
    getProfile(id) {
        return this.db
            .run(`SELECT u.id, u.email, u.displayName, u.gradYear, u.description,
                u.picture, u.reputation, u.joined, d.name AS degree
                FROM ${USERS} u
                JOIN ${DEGREES} d ON d.id = u.degreeID
                WHERE u.id=@id`,
            {
                [USERS]: { id }
            })
            .then(([profile]) => {
                if (profile) {
                    if (profile.reputation < 0) profile.reputation = 0
                    return profile
                }
                throw new APIError(ERRORS.USER.MISSING)
            })
    }

    /**
     * Generic getter, provide minimum information
     * Gets specific user corresponding to an id.
     * @param   {number}  id   Required id param.
     * @returns {object}
     */
    getPublicProfile(id) {
        return this.db
            .run(`SELECT u.id, u.displayName, u.gradYear, u.description,
                u.picture, u.reputation, u.joined, d.name AS degree
                FROM ${USERS} u
                JOIN ${DEGREES} d on d.id = u.degreeID
                WHERE u.id=@id`,
            {
                [USERS]: { id }
            })
            .then(([profile]) => {
                if (profile) {
                    if (profile.reputation < 0) profile.reputation = 0
                    return profile
                }
                throw new APIError(ERRORS.USER.MISSING)
            })
    }

    /**
     * Get all users details by UID. Used by authentication system
     * @param   {uid} uid uid string
     * @returns {object} user object
     */
    getUserByUID(uid) {
        return this.db
            .run(`SELECT u.*, d.name AS degree
                FROM ${USERS} u
                JOIN ${DEGREES} d on d.id = u.degreeID
                WHERE u.uid=@uid`,
            {
                [USERS]: { uid }
            })
            .then(([profile]) => {
                if (profile) return profile
                throw new APIError(ERRORS.USER.MISSING)
            })
    }

    /**
     * @param {object} data             controller passed in object which should
     *                                  contain the user data (probs eventually from an auth token)
     * @param {string} data.displayName userName set at signup
     * @param {string} data.degree      degree   set at signup
     * @param {number} data.gradYear    gradYear set at signup
     */
    createUser(data) {
        const { displayName, degree, gradYear } = data
        delete data.degree

        // validation
        const errors = []
        if (!displayName) {
            errors.push(ERRORS.USER.NO_NAME)
        }
        if (!degree) {
            errors.push(ERRORS.USER.NO_DEGREE)
        }
        if (!gradYear) {
            errors.push(ERRORS.USER_NO_GRAD_YEAR)
        }
        if (errors.length > 0) {
            throw new APIError({ ...ERRORS.MISC.VALIDATION, message: 'Invalid profile information', errors })
        }

        return this.db
            .run(`INSERT INTO ${USERS} (displayName, email, uid, gradYear, degreeID)
                SELECT @displayName, @email, @uid, @gradYear, id
                FROM degrees
                WHERE name = @name;
                SELECT @@identity AS id
                `,
            {
                [DEGREES]: { name: degree },
                [USERS]: data
            })
            .then(([{ id }]) => this.getProfile(id))
    }

    updateUser(id, data) {
        const { degree } = data
        delete data.degree
        return this.db
            .run(`IF EXISTS(SELECT * FROM ${USERS} WHERE id=@id)
                      UPDATE u
                      SET u.degreeID = d.id,
                      u.gradYear = @gradYear,
                      u.description = @description,
                      u.picture = @picture
                      FROM ${USERS} AS u
                      JOIN ${DEGREES} d ON d.name=@name
                      WHERE u.id = @id;
                  ELSE
                      ${toSQLThrow(ERRORS.USER.MISSING)}`,
            {
                [DEGREES]: { name: degree },
                [USERS]: { id, ...data }
            })
            .then(() => this.getProfile(id))
    }
}

let Singleton = null

/**
 * @param {object} db defaults to the db instance
 */
module.exports = function(db) {
    if (!db) {
        /* app environment, dev or prod */
        return (Singleton = Singleton ? Singleton : new User(require('./db'))) // eslint-disable-line
    }
    /* to allow injection */
    return new User(db)
}
