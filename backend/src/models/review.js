const {
    DONT_RECOMMEND,
    RECOMMEND,
    MIN_ENJOY,
    MAX_ENJOY,
    MIN_OPTION,
    MAX_OPTION,
    TABLE_NAMES: { REVIEWS, COURSES, COMMENTS, SESSIONS }
} = require('./constants')

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
            .run(`SELECT * FROM ${REVIEWS} WHERE id=@id`,
                {
                    [REVIEWS]: { id }
                })
            .then(([row]) => row || {})
    }

    /**
     * @param   {string}  code          The code of the course
     * @param   {number}  pageNumber    The page number for which we want to get questions.
     * @returns {Array}
     */
    getReviews(code, pageNumber, pageSize) {
        if (isNaN(pageNumber) || isNaN(pageSize)) {
            throw Error('Invalid paging values')
        }
        const offset = (pageSize * pageNumber) - pageSize
        return this.db
            .run(`SELECT r.*, ses.*, cou.code, (SELECT COUNT(com.reviewID)
                FROM ${COMMENTS} com
                WHERE com.reviewID = r.id) as numResponses
                FROM ${REVIEWS} r
                JOIN ${COURSES}  cou ON cou.code = @code 
                JOIN ${SESSIONS} ses ON ses.id   = r.session
                WHERE r.courseID=cou.id
                ORDER BY r.timestamp DESC
                OFFSET ${offset} ROWS
                FETCH NEXT ${pageSize} ROWS ONLY`,
            {
                [COURSES]: { code }
            })
    }

    /**
     * Gets the total number of reviews for a course
     * @param   {string} code        The code of the course
     * @returns {object}
     */
    getReviewCount(code) {
        return this.db
            .run(`SELECT COUNT(*) AS COUNT FROM ${REVIEWS} r
            WHERE r.courseID=(SELECT c.id FROM ${COURSES} c WHERE c.code=@code)`,
            {
                [COURSES]: { code }
            })
            .then(([row]) => row || { COUNT: 0 })
    }

    /**
     * @param {string} code  The code of the course.
     * @param {object} data  controller passed in object which should
     *                       contain the user data (probs eventually from an auth token)
     */
    postReview(code, { title, body, recommend, enjoy, difficulty, teaching, workload, userID, session }) {
        if (recommend !== DONT_RECOMMEND && recommend !== RECOMMEND) throw Error('Invalid recommend value')
        if (enjoy < MIN_ENJOY || enjoy > MAX_ENJOY) throw Error('Invalid enjoy value')

        ;[difficulty, teaching, workload].forEach(item => {
            if (item < MIN_OPTION || item > MAX_OPTION) throw Error('Invalid difficulty, teaching or workload value')
        })

        // insert review, get review, update course ratings
        return this.db
            .run(`INSERT INTO ${REVIEWS} (courseID, userID, title, body, recommend, enjoy, difficulty, teaching, workload, session)
                SELECT id, @userID, @title, @body, @recommend, @enjoy, @difficulty, @teaching, @workload, @session
                FROM courses
                WHERE code=@code;
                SELECT @@identity AS id`,
            {
                [REVIEWS]: { userID, title, body, recommend, enjoy, difficulty, teaching, workload, session },
                [COURSES]: { code }
            })
            .then(([{ id }]) => id)
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
