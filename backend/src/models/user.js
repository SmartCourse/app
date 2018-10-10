/* All inputs should be validated in this class that are User related */
class User {
    constructor(db) {
        console.log('initialising ORM User object')
        this.db = db
    }

    /**
     * TODO Return specialised information for auth'd user
     * @param {string} id The id of the auth'd user
     */
    getProfile(id) {
        return this.db
            .query('SELECT id, email, displayName, joined, degree, gradYear, description, picture, joined FROM user WHERE id=?', [id])
    }

    /**
     * Generic getter, provide minimum information
     * Gets specific user corresponding to an id.
     * @param   {number}  id   Required id param.
     * @returns {object}
     */
    getPublicProfile(id) {
        return this.db
            .query('SELECT id, displayName, joined, degree, gradYear, description, picture FROM user WHERE id=?', [id])
    }

    /**
     * Alternative getter to get the relevant user's details
     * @param {uid} uid uid string
     * @returns {object} user object
     */
    getUserByUID(uid) {
        return this.db
            .query('SELECT * FROM user WHERE uid=?', [uid])
    }

    /**
     * @param {object} data  controller passed in object which should
     *                       contain the user data (probs eventually from an auth token)
     */
    createUser({ displayName, email, uid }) {
        return this.db
            .insert('user', { displayName, email, uid })
            .then(id => this.getProfile(id))
    }

    updateUser(id, data) {
        return this.db
            .update('user', data, { id })
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
