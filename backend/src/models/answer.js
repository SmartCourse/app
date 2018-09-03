const db = require('./db')

/* All inputs should be validated in this class that are answer related */
class Answer {
    constructor(db) {
        console.log('initialising ORM Answer object')
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

    getAnswers(questionID, pageNumber) {
        // TODO - PAGING
        return this.db
            .queryAll('SELECT * FROM answer WHERE questionID=?', [questionID])
    }
}

module.exports = (function(db) {
    return new Answer(db)
})(db)
