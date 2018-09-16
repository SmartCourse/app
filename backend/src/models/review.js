/* All inputs should be validated in this class that are review related */
class Review {
    constructor(db) {
        console.log('initialising ORM review object')
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
     * TODO - PAGING
     * @param   {string}  code          The code the review corresponds to
     * @param   {number}  pageNumber    The page of the reviews list
     * @returns {Array}
     */
    getReviews(code, pageNumber) {
        let pageSize = 2
        let offset = (pageSize * pageNumber) - pageSize
        return this.db
            .queryAll('SELECT * FROM review WHERE code=? ORDER BY timestamp DESC LIMIT ?, ?',
                [code, offset, pageSize])
    }

    /**
     * Post a review.        let pageSize = 10
        let offset = (pageSize * pageNumber) - pageSize
     * @param {string} code  The id from the route param
     * @param {object} data  controller passed in object which should
     *                       contain the user data (probs eventually from an auth token)
     */
    postReview(code, { title, body, userID = 1 }) {
        return this.db
            .insert('review', { code, body, title, userID })
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
