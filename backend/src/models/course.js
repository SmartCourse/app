/* All inputs should be validated in this class that are course related */
class Course {
    constructor(db) {
        console.log('initialising ORM course object')
        this.db = db
    }

    /**
     * TODO add 'uni' param, add paging
     * @returns a list of courses
     */
    getCourses(subjCode) {
        if (subjCode) {
            return this.db
                .queryAll("SELECT * FROM course WHERE subjectCode = ?", [subjCode])
        } else {
            return this.db
                .queryAll('SELECT * FROM course')
        }
    }

    /**
     * Gets a course instance from the DB.
     * @returns {object}    Info specific to single course.
     */
    getCourse(code) {
        return this.db
            .query('SELECT * FROM course WHERE code=?', [code])
    }
}

let Singleton = null

/**
 * @param {object} db defaults to the db instance
 */
module.exports = function(db) {
    if (!db) {
        /* app environment, dev or prod */
        return (Singleton = Singleton ? Singleton : new Course(require('./db'))) // eslint-disable-line
    }
    /* to allow injection */
    return new Course(db)
}
