const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('./db/questions.db')

function getQuestions (course_id, page_id) {
    // TODO - PAGING (log avoids unused variable)
    console.log(page_id)
    return new Promise((resolve, reject) => {
        db.all(
            'SELECT * FROM questions WHERE cid=?',
            [course_id],
            (err, rows) => { err ? reject() : resolve(rows) }
        )
    })
}

function getQuestion (course_id, question_id) {
    return new Promise((resolve, reject) => {
        db.get(
            'SELECT * FROM questions WHERE cid=? AND qid=?',
            [course_id, question_id],
            (err, row) => {
                console.log(err)
                err ? reject() : resolve(row)
            }
        )
    })
}

function getAnswers (course_id, question_id, page_id) {
    // TODO - PAGING (log avoids unused variable)
    console.log(page_id)
    return new Promise((resolve, reject) => {
        db.all(
            'SELECT * FROM answers WHERE cid=? AND qid=?',
            [course_id, question_id],
            (err, rows) => { err ? reject() : resolve(rows) }
        )
    })
}

module.exports = {
    getQuestions,
    getQuestion,
    getAnswers
}
