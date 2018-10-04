const express = require('express')
const question = express.Router({ mergeParams: true })
const questionController = require('../controllers/question')

/* Get the question data for a specific question id */
question.get('/:id', questionController.getQuestion)

/* Get page (N) answers for a question */
question.get('/:id/answers', questionController.getQuestionAnswers)

/* Post an answer for a given question */
question.post('/:id/answers', questionController.postAnswer)

/* Get the like value */
question.get('/:id/likes', questionController.getLikes)

/* Put an updated like value */
question.put('/:id/likes', questionController.putLikes)

module.exports = question
