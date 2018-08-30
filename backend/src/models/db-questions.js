const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('./db/questions.db')

function getQuestions (courseID, pageID) {
    // TODO - PAGING (log avoids unused variable)
    console.log(pageID)
    return new Promise((resolve, reject) => {
        db.all(
            'SELECT * FROM questions WHERE cid=?',
            [courseID],
            (err, rows) => { err ? reject(err) : resolve(rows) }
        )
    })
}

function getQuestion (courseID, questionID) {
    return new Promise((resolve, reject) => {
        db.get(
            'SELECT * FROM questions WHERE cid=? AND qid=?',
            [courseID, questionID],
            (err, row) => {
                console.log(err)
                err ? reject(err) : resolve(row)
            }
        )
    })
}

function getAnswers (courseID, questionID, pageID) {
    // TODO - PAGING (log avoids unused variable)
    console.log(pageID)
    return new Promise((resolve, reject) => {
        db.all(
            'SELECT * FROM answers WHERE cid=? AND qid=?',
            [courseID, questionID],
            (err, rows) => { err ? reject(err) : resolve(rows) }
        )
    })
}

module.exports = {
    getQuestions,
    getQuestion,
    getAnswers
}
