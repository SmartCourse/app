const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('./db/questions.db')

function get_all_questions(data) {
  // Lookup all questions
  return new Promise((resolve, reject) => { 
    db.all('SELECT rowid, uid, title, body FROM questions', (err, rows) => {
    
      // Check for a qeury error
      if (err) {
        reject(data)
      }

      // Transform the requested data into the appropriate format
      data = rows.map(({rowid, uid, title, body}) => ({
        id: rowid,
        meta: {uid},
        title,
        body
      }))
      resolve(data)
    })
  })
}

function get_question(data, question_id) {
  // Lookup a specific question
  return new Promise((resolve, reject) => {
    db.get(
      'SELECT rowid, uid, title, body FROM questions WHERE rowid=$qid',
      { $qid: question_id },
      (err, row) => {
        
        // Check for a qeury error
        if (err) {
          reject(data)
        }

        // Transform the requested data into the appropriate format
        data.question = {
          id: row.rowid,
          meta: {uid: row.uid},
          title: row.title,
          body: row.body
        }
        resolve(data)
      }
    )
  })
}

 function get_answers(data, question_id) {
  // Lookup answers
  return new Promise((resolve, reject) => { 
    db.all(
      'SELECT uid, cid, rowid, title, body FROM answers WHERE qid=$qid',
      { $qid: question_id },
      (err, rows) => {

        // Check for a qeury error
        if (err) {
          reject(data)
        }

        // Otherwise return the requested data in the appropriate format
        data.answers = rows.map(({rowid, uid, title, body}) => ({
          meta: {uid},
          id: rowid,
          title,
          body
        }))
        resolve(data)
      }
    )
  })
}

module.exports = {
  get_all_questions,
  get_question,
  get_answers,
}