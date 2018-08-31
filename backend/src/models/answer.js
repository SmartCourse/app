const dbModel = require('./db')
const db = dbModel.db

exports.getAnswers = function (questionID, pageNumber) {
    // TODO - PAGING (log avoids unused variable)
    return new Promise((resolve, reject) => {
        db.all(
            'SELECT * FROM answer WHERE questionID=?',
            [questionID],
            (err, rows) => { err ? reject(err) : resolve(rows) }
        )
    })
}
