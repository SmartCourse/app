const express = require('express')
const router = express.Router()
const questionController = require('../controllers/question')

/* Get the question data for a specific question id */
router.get('/:id', questionController.getQuestion)

/* Get page (N) answers for a question */
router.get('/:id/answers', questionController.getQuestionAnswers)

/* Get page (N) answers for a question */
router.post('/:id/answers', questionController.postAnswer)

module.exports = router
