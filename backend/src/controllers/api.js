const express = require('express')
const router = express.Router()
const qdb = require('../models/db-questions.js')

const userRouter = require('../routes/user.js')
const uniRouter = require('../controllers/uni.jsutes/uni.js')
const courseRouter = require('../controllers/course.js')

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
    const qid = req.params.qid
    Promise.all([qdb.getQuestion(qid), qdb.getAnswers(qid)])
        .then(([questions, answers]) => res.json({ questions, answers }))
})

router.use('*', function (_, res) {
    res.sendStatus(404)
})

module.exports = router
