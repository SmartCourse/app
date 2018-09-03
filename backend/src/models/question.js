const db = require('./db')

function getQuestions (courseID, pageNumber) { /* eslint-disable-line */
    // TODO - PAGING (log avoids unused variable)
    return new Promise((resolve, reject) => {
        db._db.all(
            'SELECT * FROM question WHERE courseID=?',
            [courseID],
            (err, rows) => { err ? reject(err) : resolve(rows) }
        )
    })
}

function getQuestion (questionID) {
    return new Promise((resolve, reject) => {
        db._db.get(
            'SELECT * FROM question WHERE questionID=?',
            [questionID],
            (err, row) => { err ? reject(err) : resolve(row) }
        )
    })
}

function postQuestion (courseID = 1, userID = 1, { title, body }) {
    return db.insert('question', { courseID, userID, title, body })
}

exports.getQuestion = getQuestion
exports.postQuestion = postQuestion
exports.getQuestions = getQuestions
