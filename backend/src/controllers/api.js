const express = require('express')
const router = express.Router()
const qdb = require('../utils/db-questions.js')

/* Root API for debugging */
router.get('/', function(req, res) {
  res.send('<h1>Welcome to the API</h1>')
})

/* GET questions listing. */
router.get('/questions', function(req, res) {
  qdb.get_all_questions({}).then((data) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
    res.json(data)
  })
})

/* GET question data. */
router.get('/questions/:qid', function(req, res) {

  // Lookup the question
  const question_id = req.params.qid
  console.log(question_id)
  qdb.get_question({}, question_id).then((data) => {
    return qdb.get_answers(data, question_id)
  }).then((data) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
    res.json(data)
  })
})

module.exports = router