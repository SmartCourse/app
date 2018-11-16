/* All inputs should be validated in this class that are question related */
class Question {
    constructor(db) {
        console.log('initialising ORM Question object')
        this.db = db
    }

    /**
     * Gets specific question corresponding to an id.
     * @param   {id}      questionID Required id param.
     * @returns {object}             Single question
     */
    getQuestion(questionID) {
        return this.db.query('SELECT * FROM question WHERE id=?', [questionID])
    }

    /**
     * Get a specific page of questions for a course
     * @param   {string} code        The code of the course
     * @param   {number} pageNumber  The page number for which we want to get questions.
     * @returns {object}
     */
    getQuestions(code, pageNumber, pageSize) {
        const offset = (pageSize * pageNumber) - pageSize
        return this.db
            .queryAll('select * from question where code = ? LIMIT ?, ?',
                [code, offset, pageSize])
            /* TODO why is this query broken?
               `SELECT
                question.*,
                COUNT(comment.questionID) AS numAnswers
               FROM question
               JOIN comment ON comment.questionID = question.id
               WHERE question.code=?
               GROUP BY comment.questionID
               ORDER BY timestamp DESC
               LIMIT ?, ?`,
               //
            */
    }

    getQuestionsByUserID(uid, limit = 10) {
        return this.db
            .queryAll('select * from question WHERE userID=? LIMIT ?', [uid, limit])
            /* TODO why is this query suddenly broken?
            `SELECT
            question.*,
            COUNT(questionID) AS numAnswers
           FROM question
           LEFT JOIN comment ON comment.questionID = question.id
           WHERE question.userID=?
           GROUP BY questionID
           ORDER BY timestamp DESC
           LIMIT ?`, [uid, limit])
           */
    }

    /**
     * Gets the total number of questions for a course
     * @param   {string} code        The code of the course duh
     * @returns {object}
     */
    getQuestionCount(code) {
        return this.db
            .queryAll('SELECT COUNT() FROM question WHERE code=?',
                [code])
    }

    /**
     * Post a question.
     * @param {string}  code  The code of the course
     * @param {object}  data      controller passed in object which should
     *                       contain the user data (probs eventually from an auth token)
     */
    postQuestion(code, { userID, title, body }) {
        return this.db
            .insert('question', { code, userID, title, body })
            .then((questionID) => this.getQuestion(questionID))
    }
}

let Singleton = null

/**
 * @param {object} db defaults to the db instance
 */
module.exports = function(db) {
    if (!db) {
        /* app environment, dev or prod */
        return (Singleton = Singleton ? Singleton : new Question(require('./db'))) // eslint-disable-line
    }
    /* to allow injection */
    return new Question(db)
}
