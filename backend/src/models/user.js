/* All inputs should be validated in this class that are User related */
class User {
    constructor(db) {
        console.log('initialising ORM User object')
        this.db = db
    }

    /**
     * TODO Return specialsed information for auth'd user
     * @param {string} id The id of the auth'd user
     */
    getProfile(id) {
        return this.db
            .query('SELECT * FROM user WHERE id=?', [id])
    }

    /**
     * Generic getter, provide minimum information
     * Gets specific user corresponding to an id.
     * @param   {number}  id   Required id param.
     * @returns {object}
     */
    getUser(id) {
        return this.db
            .query('SELECT * FROM user WHERE id=?', [id])
    }

    /**
     * @param {string} code  The code of the course.
     * @param {object} data  controller passed in object which should
     *                       contain the user data (probs eventually from an auth token)
     */
    createUser(code, { firstName = 'Alex', lastName = 'Papandneves', email }) {
        return this.db
            .insert('user', { firstName, lastName, email })
            .then(id => this.getProfile(id))
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
