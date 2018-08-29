const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('./db/questions.db')

function getAllQuestions () {
    // Lookup all questions
    return new Promise((resolve, reject) => {
        db.all('SELECT rowid, uid, title, body FROM questions', (err, rows) => {
            // Check for a qeury error
            if (err) {
                reject(err)
            }

            // Transform the requested data into the appropriate format
            resolve(rows.map(({ rowid, uid, title, body }) => ({
                id: rowid,
                meta: { uid },
                title,
                body
            })))
        })
    })
}

function getQuestion (questionID) {
    // Lookup a specific question
    return new Promise((resolve, reject) => {
        db.get(
            'SELECT rowid, uid, title, body FROM questions WHERE rowid=$qid',
            { $qid: questionID },
            (err, row) => {
                // Check for a qeury error
                if (err) {
                    reject(err)
                }

                // Transform the requested data into the appropriate format
                resolve({
                    id: row.rowid,
                    meta: { uid: row.uid },
                    title: row.title,
                    body: row.body
                })
            }
        )
    })
}

function getAnswers (questionID) {
    // Lookup answers
    return new Promise((resolve, reject) => {
        db.all(
            'SELECT uid, cid, rowid, title, body FROM answers WHERE qid=$qid',
            { $qid: questionID },
            (err, rows) => {
                // Check for a qeury error
                if (err) {
                    reject(err)
                }

                // Transform the requested data into the appropriate format
                resolve(rows.map(({ rowid, uid, title, body }) => ({
                    meta: { uid },
                    id: rowid,
                    title,
                    body
                })))
            }
        )
    })
}

module.exports = {
    getAllQuestions,
    getQuestion,
    getAnswers
}
