const express = require('express')
const sqlite3 = require('sqlite3')
const router = express.Router()
const questions = new sqlite3.Database('./db/questions.db')

/* Root API for debugging */
router.get('/', function(req, res) {
  res.send('<h1>Welcome to the API</h1>')
})

/* GET questions listing. */
router.get('/_questions', function(req, res) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
  questions.all('SELECT rowid, uid, title, body FROM questions', (err, rows) => {
    
    // Check for a qeury error
    if (err) {
      console.log(err.message)
      return
    }

    // Otherwise return the requested data in the appropriate format
    const data = rows.map(({rowid, uid, title, body}) => ({
      id: rowid,
      meta: {uid},
      title,
      body
    }))
    res.json(data)
  })
})

router.use('*', function(_, res) {
  res.sendStatus(404)
})

module.exports = router