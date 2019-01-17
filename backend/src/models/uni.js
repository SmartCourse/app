const { TABLE_NAMES: { DEGREES, SUBJECTS, FACULTIES, SESSIONS } } = require('./constants')

/* All inputs should be validated in this class that are subject related */
class Uni {
    constructor(db) {
        console.log('initialising ORM Uni object')
        this.db = db
    }

    /**
     * TODO add 'uni' param, add paging
     * @returns a list of courses
     */
    getSubjects() {
        return this.db
            .run(`SELECT * FROM ${SUBJECTS}`)
    }

    getDegrees() {
        return this.db
            .run(`SELECT * FROM ${DEGREES}`)
    }

    getFaculties() {
        return this.db
            .run(`SELECT * FROM ${FACULTIES}`)
    }

    /**
     * @returns {Array} Available sessions in database
     */
    getSessions() {
        return this.db
            .run(`SELECT * FROM ${SESSIONS}`)
    }
}

let Singleton = null

/**
 * @param {object} db defaults to the db instance
 */
module.exports = function(db) {
    if (!db) {
        /* app environment, dev or prod */
        return (Singleton = Singleton ? Singleton : new Uni(require('./db'))) // eslint-disable-line
    }
    /* to allow injection */
    return new Uni(db)
}
