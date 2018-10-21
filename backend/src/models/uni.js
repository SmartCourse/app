/* All inputs should be validated in this class that are subject related */
class Uni {
    constructor(db) {
        console.log('initialising ORM subject object')
        this.db = db
    }

    /**
     * TODO add 'uni' param, add paging
     * @returns a list of courses
     */
    getSubjects() {
        return this.db
            .queryAll('SELECT * FROM subjects')
    }

    getDegrees() {
        return this.db
            .queryAll('SELECT * FROM degrees')
    }

    getFaculties() {
        return this.db
            .queryAll('SELECT * FROM faculties')
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