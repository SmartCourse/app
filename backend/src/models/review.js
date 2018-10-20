const { DONT_RECOMMEND, RECOMMEND, MIN_ENJOY, MAX_ENJOY, MIN_OPTION, MAX_OPTION } = require('./constants')

/* All inputs should be validated in this class that are review related */
class Review {
    constructor(db) {
        console.log('initialising ORM Review object')
        this.db = db
    }

    /**
     * Gets specific review corresponding to an id.
     * @param   {number}  id   Required id param.
     * @returns {object}
     */
    getReview(id) {
        return this.db
            .query('SELECT * FROM review WHERE id=?', [id])
    }

    /**
     * @param   {string}  code          The code of the course
     * @param   {number}  pageNumber    The page number for which we want to get questions.
     * @returns {Array}
     */
    getReviews(code, pageNumber, pageSize) {
        const offset = (pageSize * pageNumber) - pageSize
        return this.db
            .queryAll('SELECT * FROM review WHERE code=? ORDER BY timestamp DESC LIMIT ?, ?',
                [code, offset, pageSize])
    }

    /**
     * Gets the total number of reviews for a course
     * @param   {string} code        The code of the course
     * @returns {object}
     */
    getReviewCount(code) {
        return this.db
            .queryAll('SELECT COUNT() FROM review WHERE code=?',
                [code])
    }

    /**
     * @param {string} code  The code of the course.
     * @param {object} data  controller passed in object which should
     *                       contain the user data (probs eventually from an auth token)
     */
    postReview(code, { title, body, recommend, enjoy, difficulty, teaching, workload, userID }) {
        if (recommend !== DONT_RECOMMEND && recommend !== RECOMMEND) throw Error('Invalid recommend value')
        if (enjoy < MIN_ENJOY || enjoy > MAX_ENJOY) throw Error('Invalid enjoy value')

        ;[difficulty, teaching, workload].forEach(item => {
            if (item < MIN_OPTION || item > MAX_OPTION) throw Error('Invalid difficulty, teaching or workload value')
        })

        // insert review, get review, update course ratings
        return this.db
            .insert('review', { code, userID, title, body, recommend, enjoy, difficulty, teaching, workload })
            .then((reviewID) => this.getReview(reviewID))
    }
}

let Singleton = null

/**
 * @param {object} db defaults to the db instance
 */
module.exports = function(db) {
    if (!db) {
        /* app environment, dev or prod */
        return (Singleton = Singleton ? Singleton : new Review(require('./db'))) // eslint-disable-line
    }
    /* to allow injection */
    return new Review(db)
}
