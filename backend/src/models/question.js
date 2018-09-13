/* All inputs should be validated in this class that are question related */
class Question {
    constructor(db) {
        console.log('initialising ORM question object')
        this.db = db
    }

    /**
     * TODO - PAGING
     * @param   {string} code        The code of the couse we're getting questions for.
     * @param   {number} pageNumber  The pageNumber, defaults to 1?, if higher than max should just give max.
     * @returns {object}
     */
    getQuestions(code, pageNumber = 1) {
        return this.db
            .queryAll('SELECT * FROM question WHERE code=?', [code])
    }

    /**
     * Gets specific question corresponding to an id.
     * @param   {id}      questionID Required id param.
     * @returns {object}             Single question
     */
    getQuestion(questionID) {
        return this.db
            .query('SELECT * FROM question WHERE id=?', [questionID])
    }

    /**
     * Post a question.
     * @param {string} code  The id from the route param
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
