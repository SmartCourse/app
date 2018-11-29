const { TABLE_NAMES: { USERS } } = require('./constants')

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
        return this.db.query(`SELECT id, email, displayName, degree, gradYear, description, picture, reputation, joined FROM ${USERS} WHERE id=?`, [id])
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
        return this.db.query(`SELECT id, displayName, degree, gradYear, description, picture, reputation, joined FROM ${USERS} WHERE id=?`, [id])
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
            .query(`SELECT * FROM ${USERS} WHERE uid=?`, [uid])
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
        if (!(displayName && degree && gradYear)) {
            return Promise.reject(Error('You must provide a display name!'))
        }
        return this.db
            .insert(USERS, data)
            .then(id => this.getProfile(id))
            .catch(error => {
                // TODO kinda hacky
                if (error.errno === 19 && error.message.includes('displayName')) {
                    throw (Error('That display name is taken! Sorry!'))
                }
                throw (error)
            })
    }

    updateUser(id, data) {
        return this.db
            .update(USERS, data, { id })
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
