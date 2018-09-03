const db = require('./db')

/* All inputs should be validated in this class that are course related */
class Course {
    constructor(db) {
        console.log('initialising ORM course object')
        this.db = db
    }

    getCourses() {
        return this.db
            .queryAll('SELECT * FROM course')
    }

    getCourse(courseID) {
        return this.db
            .query('SELECT * FROM course WHERE courseID=?', [courseID])
    }
}

module.exports = (function(db) {
    return new Course(db)
})(db)
