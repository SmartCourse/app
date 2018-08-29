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
router.get('/', function (req, res) {
    res.send('<h1>Welcome to the API</h1>')
})

/* GET questions listing. */
router.get('/questions', function (req, res) {
    qdb.getAllQuestions()
        .then(data => res.json(data))
})

/* GET question data. */
router.get('/questions/:qid', function (req, res) {
    const questionID = req.params.qid
    Promise.all([qdb.getQuestion(questionID), qdb.getAnswers(questionID)])
        .then(([questions, answers]) => res.json({ questions, answers }))
})

router.use('*', function (_, res) {
    res.sendStatus(404)
})

module.exports = router
