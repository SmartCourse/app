const db = require('./db')

function getAnswers(questionID, pageNumber) {
    // TODO - PAGING
    return new Promise((resolve, reject) => {
        db.all(
            'SELECT * FROM answer WHERE questionID=?',
            [questionID],
            (err, rows) => { err ? reject(err) : resolve(rows) }
        )
    })
}

function postAnswer (questionID, { body }) {
    return new Promise((resolve, reject) => {
        const columns = ['userID', 'questionID', 'body']
        const placeholders = columns.map(_ => '?').join()
        const query = `INSERT INTO answer (${columns}) VALUES (${placeholders})`
        db.run(
            query,
            [0, questionID, body], // TODO user id is a placeholder obviously, but it can't be null so...
            // TODO meaningful error message/code based on sql error
            // TODO proper error handling for all the endpoints :/
            function (err) { err ? reject(Error('Error adding answer')) : resolve(getAnswers(questionID, 1)) }
        )
    })
}

exports.getAnswers = getAnswers
exports.postAnswer = postAnswer
