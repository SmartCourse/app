/* All inputs should be validated in this class that are answer related */
class Answer {
    constructor(db) {
        console.log('initialising ORM answer object')
        this.db = db
    }

    /* TODO change this */
    postAnswer(questionID, { body, userID = 1 }) {
        return this.db
            .insert('answer', { questionID, body, userID })
            /* Still not sure on this, seems wasteful to send all new data */
            .then(() => this.getAnswers(questionID, 1))
    }

    /**
     * // TODO - PAGING
     * Get all of dem answers for a specific question
     * @param   {id}     questionID
     * @param   {number} pageNumber
     * @returns {Array}
     */
    getAnswers(questionID, pageNumber = 1) {
        return this.db
            .queryAll('SELECT * FROM answer WHERE questionID=?', [questionID])
    }
}

let Singleton = null

/**
 * @param {object} db defaults to the db instance
 */
module.exports = function(db) {
    if (!db) {
        /* app environment, dev or prod */
        return (Singleton = Singleton ? Singleton : new Answer(require('./db'))) // eslint-disable-line
    }
    /* to allow injection */
    return new Answer(db)
}
