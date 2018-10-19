/* All inputs should be validated in this class that are User related */
class User {
    constructor(db) {
        console.log('initialising ORM User object')
        this.db = db
    }

    /**
     * Return specialised information for auth'd user
     * @param {string} id The id of the auth'd user
     */

    getProfile(id) {
        return Promise.all([
            this.db.query('SELECT id, email, displayName, degree, gradYear, description, picture, reputation, joined FROM user WHERE id=?', [id]),
            this.getUserReputation(id)
        ]).then(([profile, reputation]) => {
            return { ...profile, ...reputation }
        })
    }

    /**
     * Generic getter, provide minimum information
     * Gets specific user corresponding to an id.
     * @param   {number}  id   Required id param.
     * @returns {object}
     */
    getPublicProfile(id) {
        return Promise.all([
            this.db.query('SELECT id, displayName, degree, gradYear, description, picture, reputation, joined FROM user WHERE id=?', [id]),
            this.getUserReputation(id)
        ]).then(([profile, reputation]) => {
            return { ...profile, ...reputation }
        })
    }

    /**
     * Getter that calculates a user's reputation based on
     * the number of likes they have received, exluding self
     * likes.
     * @param   {number}  id   Required id param.
     * @returns {object}
     */
    // join on likes <--> comments join on likes <--> reviews join on likes <--> questions
    getUserReputation(id) {
        return Promise.all([
            this.db.query(`SELECT SUM(value) AS rep 
                           FROM likes JOIN comment
                           ON likes.objectType = 'answer' AND likes.objectID = comment.id 
                           WHERE likes.userID!=?`, [id]),
            this.db.query(`SELECT SUM(value) AS rep 
                           FROM likes JOIN comment
                           ON likes.objectType = 'reply' AND likes.objectID = comment.id 
                           WHERE likes.userID!=?`, [id]),
            this.db.query(`SELECT SUM(value) AS rep 
                           FROM likes JOIN question
                           ON likes.objectID = question.id 
                           WHERE likes.userID!=?`, [id]),
            this.db.query(`SELECT SUM(value) AS rep 
                           FROM likes JOIN review
                           ON likes.objectID = review.id 
                           WHERE likes.userID!=?`, [id])
        ])
            .then((results) => {
                let reputation = 0
                results.forEach(({ rep }) => { reputation += rep })
                if (reputation < 0) {
                    return { 'reputation': 0 }
                } else {
                    return { reputation }
                }
            })
    }

    /**
     * Get all users details by UID. Used by authentication system
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
        if (!displayName) {
            return Promise.reject(Error('You must provide a display name!'))
        }
        return this.db
            .insert('user', { displayName, email, uid })
            .then(id => this.getProfile(id))
            .catch(error => {
                // kinda hacky
                if (error.errno === 19 && error.message.includes('displayName')) {
                    throw (Error('That display name is taken! Sorry!'))
                }
                throw (error)
            })
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
