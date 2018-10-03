/* All inputs should be validated in this class that are course related */
class Course {
    constructor(db) {
        console.log('initialising ORM Course object')
        this.db = db
    }

    /**
     * TODO add 'uni' param, add paging
     * @returns a list of courses
     */
    getCourses() {
        return this.db
            .queryAll('SELECT * FROM course')
    }

    getCoursesBySubject(subjCode) {
        return this.db
            .queryAll('SELECT * FROM course WHERE subjectCode = ?', [subjCode])
    }

    /**
     * Gets a course instance from the DB.
     * @returns {object}    Info specific to single course.
     */
    getCourse(code) {
        return this.db
            .query('SELECT * FROM course WHERE code=?', [code])
    }

    updateCourseRatings(code) {
        // recommend is just count(all recommended)/count(all reviews)
        // others are mean(values - 1)*(100/2) for all values > 0
        // ^ we need to subtract 1 from each value when taking the mean to get it in 0-2 range
        // ^ we take this mean and divide by 2 (range is 0-2) to get a normalised value
        // ^ multiply by 100 so we have an integer percentage
        return this.db
            .run(`UPDATE course
                    SET
                      rating = (SELECT CASE WHEN COUNT(*)==0 THEN 0 ELSE COUNT(DISTINCT recommend==1)*100/COUNT(*) END FROM review WHERE code==$code),
                      difficulty = (SELECT CASE WHEN COUNT(*)==0 THEN 0 ELSE SUM(difficulty-1)*100/(2*COUNT(*)) END FROM review WHERE code==$code AND difficulty > 0),
                      teaching = (SELECT CASE WHEN COUNT(*)==0 THEN 0 ELSE SUM(teaching-1)*100/(2*COUNT(*)) END FROM review WHERE code==$code AND teaching > 0),
                      workload = (SELECT CASE WHEN COUNT(*)==0 THEN 0 ELSE SUM(workload-1)*100/(2*COUNT(*)) END FROM review WHERE code==$code AND workload > 0)
                    WHERE code=$code;`
                  , {$code:code})
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
