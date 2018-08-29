const express = require('express')
const router = express.Router({mergeParams: true})
const questionController = require('../controllers/question')

/* Get the question data for a specific question id */
router.get('/:id', questionController.getQuestion)

/* Get page (N) answers for a question */
router.get('/:id/answers', questionController.getQuestionAnswers)

module.exports = router