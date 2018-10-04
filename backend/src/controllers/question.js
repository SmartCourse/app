const questionModel = require('../models/question')()
const commentModel = require('../models/comment')()
const likesModel = require('../models/likes')()
const errorHandler = require('./error')
const { responseHandler } = require('../utils/helpers')

/* GET question data. */
exports.getQuestion = function ({ params }, res) {
    const getQuestion = Promise.all([
        questionModel.getQuestion(params.id),
        likesModel.getLikes({ type: 'question', id: params.id })
    ])
        .then(([question, likes]) => { return { ...question, ...likes } })

    responseHandler(getQuestion, res)
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

/* GET the likes value */
exports.getLikes = function ({ params }, res) {
    responseHandler(likesModel.getLikes({ type: 'question', id: params.id }), res)
        .catch(errorHandler(res))
}

/* PUT updated likes value */
exports.putLikes = function ({ params, body }, res) {
    responseHandler(likesModel.putLikes({ type: 'question', id: params.id, ...body }), res)
        .catch(errorHandler(res))
}
