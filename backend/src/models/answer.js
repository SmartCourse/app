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
