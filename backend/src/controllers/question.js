const questionModel = require('../models/question')()
const commentModel = require('../models/comment')()
const errorHandler = require('./error')
const { responseHandler } = require('../utils/helpers')

/* GET question data. */
exports.getQuestion = function ({ params }, res) {
    responseHandler(questionModel.getQuestion(params.id), res)
        .catch(errorHandler(res))
}

/* GET question ansewrs. */
exports.getQuestionAnswers = function ({ params, query }, res) {
    responseHandler(commentModel.getComments({ questionID: params.id }, query.p), res)
        .catch(errorHandler(res))
}

/* POST new answer. */
exports.postAnswer = function ({ params, body }, res) {
    console.log(body)
    responseHandler(commentModel.postComment({ questionID: params.id }, body), res)
        .catch(errorHandler(res))
}

/* PUT updated likes value */
exports.putLikes = function ({ params, body }, res) {
    console.log(body.likes)
    responseHandler(questionModel.putQuestionLikes(params.id, body.likes), res)
        .catch(errorHandler(res))
}
