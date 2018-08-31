const dbModel = require('./db')
const db = dbModel.db

exports.getQuestions = function (courseID, pageNumber) {
    // TODO - PAGING (log avoids unused variable)
    console.log(pageNumber)
    return new Promise((resolve, reject) => {
        db.all(
            'SELECT * FROM question WHERE courseID=?',
            [courseID],
            (err, rows) => { err ? reject(err) : resolve(rows) }
        )
    })
}

exports.getQuestion = function (questionID) {
    return new Promise((resolve, reject) => {
        db.get(
            'SELECT * FROM question WHERE questionID=?',
            [questionID],
            (err, row) => { err ? reject(err) : resolve(row) }
        )
    })
}
