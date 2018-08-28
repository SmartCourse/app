const express = require('express')
const router = express.Router()
const qdb = require('../models/db-questions.js')

const userRouter = require('./user')
const uniRouter = require('./uni')
const courseRouter = require('./course')

router.use('/user', userRouter)
router.use('/uni', uniRouter)
router.use('/course/:cid', courseRouter)

/* Root API for debugging */
router.get('/', function(req, res) {
  res.send('<h1>Welcome to the API</h1>')
})

/* GET questions listing. */
router.get('/questions', function(req, res) {
  qdb.get_all_questions({}).then((data) => {
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
    res.json(data)
  })
})

router.use('*', function(_, res) {
  res.sendStatus(404)
})

module.exports = router