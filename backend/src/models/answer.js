const db = require('./db')

exports.getAnswers = function (questionID, pageNumber) {
    // TODO - PAGING
    return new Promise((resolve, reject) => {
        db.all(
            'SELECT * FROM answer WHERE questionID=?',
            [questionID],
            (err, rows) => { err ? reject(err) : resolve(rows) }
        )
    })
}

exports.postAnswer = function (questionID, {body}) {
    return new Promise((resolve, reject) => {
        const columns = ['userID', 'questionID', 'body']
        const placeholders = columns.map(_ => '?').join()
        const query = `INSERT INTO answer (${columns}) VALUES (${placeholders})`
        db.run(
            query,
            [0, questionID, body], // TODO user id is a placeholder obviously, but it can't be null so...
            function (err) { err ? reject(err) : resolve(err) }
        )
    })
}
