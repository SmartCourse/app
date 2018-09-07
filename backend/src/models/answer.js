/* All inputs should be validated in this class that are answer related */
class Answer {
    constructor(db) {
        console.log('initialising ORM answer object')
        this.db = db
    }

    /* TODO change this */
    postAnswer(questionID, { body }) {
        const self = this
        return new Promise((resolve, reject) => {
            const columns = ['userID', 'questionID', 'body']
            const placeholders = columns.map(_ => '?').join()
            const query = `INSERT INTO answer (${columns}) VALUES (${placeholders})`
            this.db._db.run(
                query,
                [0, questionID, body], // TODO user id is a placeholder obviously, but it can't be null so...
                // TODO meaningful error message/code based on sql error
                // TODO proper error handling for all the endpoints :/
                function (err) { err ? reject(Error('Error adding answer')) : resolve(self.getAnswers(questionID, 1)) }
            )
        })
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
