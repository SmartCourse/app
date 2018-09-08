/* All inputs should be validated in this class that are review related */
class Review {
    constructor(db) {
        console.log('initialising ORM review object')
        this.db = db
    }

    /**
     * Post a question.
     * @param {id} courseID  The id from the route param
     * @param {*}  data      controller passed in object which should
     *                       contain the user data (probs eventually from an auth token)
     */
    postReview(courseID, { body, userID = 1 }) {
        return this.db
            .insert('review', { courseID, body, userID })
            /* Still not sure on this, seems wasteful to send all new data */
            .then(() => this.getReviews(courseID, 1))
    }

    /**
     * Gets specific question corresponding to an id.
     * @param   {number}  reviewID   Required id param.
     * @returns {object}             Single question
     */
    getReview(reviewID) {
        return this.db
            .query('SELECT * FROM review WHERE reviewID=?', [reviewID])
    }

    /**
     * // TODO - PAGING
     * Get all of dem reviews for a specific question
     * @param   {number}  courseID
     * @param   {number}  pageNumber
     * @returns {Array}
     */
    getReviews(courseID, pageNumber = 1) {
        return this.db
            .queryAll('SELECT * FROM review WHERE courseID=?', [courseID])
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
