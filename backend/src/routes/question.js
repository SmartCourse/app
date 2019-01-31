const express = require('express')
const question = express.Router({ mergeParams: true })
const questionController = require('../controllers/question')
const commentController = require('../controllers/comment')
const { isAuthorized } = require('../utils/helpers')

/* Get the question data for a specific question id */
question.get('/:id', questionController.getQuestion)

/* Get page (N) answers for a question */
question.get('/:id/answers', questionController.getQuestionAnswers)

/* Get the question like value */
question.get('/:id/likes', questionController.getQuestionLikes)

/* Get the question's answer like value */
question.get('/:id/answer/:answerID/likes', questionController.getAnswerLikes)

/* Get an answer for a given question */
question.get('/:id/answer/:cid', commentController.getComment)

/* -------------------------- full auth check ----------------------- */
question.use(isAuthorized)

/* Delete a question */
question.delete('/:id', questionController.deleteQuestion)

/* Put an updated question */
question.put('/:id', questionController.putQuestion)

/* Post an answer for a given question */
question.post('/:id/answer', questionController.postAnswer)

/* Delete an answer */
question.delete('/:id/answer/:cid', commentController.deleteComment)

/* Put an updated answer */
question.put('/:id/answer/:cid', commentController.putComment)

/* Put an updated question like value */
question.put('/:id/likes', questionController.putQuestionLikes)

/* Put an updated question's answer like value */
question.put('/:id/answer/:answerID/likes', questionController.putAnswerLikes)

/* Report a question */
question.post('/:id/report', reportController.reportQuestion)

/* Get reports on a question */
question.get('/:id/reports', reportController.getQuestionReports)

/* TODO Report an answer */
//question.post('/:id/answer/:answerID/report', reportController.reportAnswer)

module.exports = question
