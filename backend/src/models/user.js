const { TABLE_NAMES: { USERS, DEGREES } } = require('./constants')

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
            .then(([row]) => row || {})
            .then((profile) => {
                if (profile.reputation < 0) profile.reputation = 0
                return profile
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
            .then(([row]) => row || {})
            .then((profile) => {
                // this is defensive and should never really occur
                // but will avoid unnecessary crashes
                if (!profile) {
                    return console.warn('invalid userId', id)
                }
                if (profile.reputation < 0) profile.reputation = 0

                return profile
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
            .then(([row]) => row || {})
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
        if (!(displayName && degree && gradYear)) {
            return Promise.reject(Error('You must provide a display name!'))
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
            .run(`UPDATE u
                SET u.degreeID = d.id,
                u.gradYear = @gradYear,
                u.description = @description,
                u.picture = @picture
                FROM ${USERS} AS u
                JOIN ${DEGREES} d ON d.name=@name
                WHERE u.id = @id`,
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
