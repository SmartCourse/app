const { TABLE_NAMES: { USERS, DEGREES }, PERM_ADMIN, PERM_USER } = require('./constants')
const { APIError, toSQLErrorCode, translateSQLError } = require('../utils/error')

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
                u.picture, u.reputation, u.joined, u.permissions, d.name AS degree
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
                throw new APIError({ status: 404, code: 7001, message: 'No such user' })
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
                throw new APIError({ status: 404, code: 7001, message: 'No such user' })
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
                throw new APIError({ status: 404, code: 7001, message: 'No such user' })
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
            errors.push({ code: 7004, message: 'You must provide a display name' })
        }
        if (!degree) {
            errors.push({ code: 7005, message: 'You must provide a degree' })
        }
        if (!gradYear) {
            errors.push({ code: 7006, message: 'You must provide a graduation year' })
        }
        if (errors.length > 0) {
            throw new APIError({ status: 400, code: 1002, message: 'Invalid profile information', errors })
        }

        // create superuser
        data.permissions = data.uid === process.env.SUPERUSER_UID ? PERM_ADMIN : PERM_USER

        return this.db
            .run(`INSERT INTO ${USERS} (displayName, email, uid, gradYear, degreeID, permissions)
                SELECT @displayName, @email, @uid, @gradYear, id, @permissions
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
                      THROW ${toSQLErrorCode(7001)}, 'No such user', 1;`,
            {
                [DEGREES]: { name: degree },
                [USERS]: { id, ...data }
            })
            .then(() => this.getProfile(id))
            .catch(translateSQLError({ [toSQLErrorCode(7001)]: 404 }))
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
