const express = require('express')
const question = express.Router({ mergeParams: true })
const questionController = require('../controllers/question')
const { isLoggedIn } = require('../utils/helpers')

/* Get the question data for a specific question id */
question.get('/:id', questionController.getQuestion)

/* Get page (N) answers for a question */
question.get('/:id/answers', questionController.getQuestionAnswers)

/* Get the question like value */
question.get('/:id/likes', questionController.getQuestionLikes)

/* Get the question's answer like value */
question.get('/:id/answer/:answerID/likes', questionController.getAnswerLikes)

/* full auth check */
question.use(isLoggedIn)

/* Post an answer for a given question */
question.post('/:id/answers', questionController.postAnswer)

/* Put an updated question like value */
question.put('/:id/likes', questionController.putQuestionLikes)

/* Put an updated question's answer like value */
question.put('/:id/answer/:answerID/likes', questionController.putAnswerLikes)

module.exports = question
