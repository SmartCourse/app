const questionModel = require('../models/question')()
const commentModel = require('../models/comment')()

/* GET question data. */
exports.getQuestion = function ({ params }, res) {
    questionModel.getQuestion(params.id)
        .then(data => res.json(data))
        .catch(console.warn)
}

/* GET question ansewrs. */
exports.getQuestionAnswers = function ({ params, query }, res) {
    commentModel.getComments({ questionID: params.id }, query.p)
        .then(data => res.json(data))
}

/* POST new answer. */
exports.postAnswer = function ({ params, body }, res) {
    commentModel.postComment({ questionID: params.id }, body)
        .then(data => res.json(data))
        // TODO potentially more meaningful error code or something
        .catch(error => res.status(400).json({ code: 400, message: error.message }))
}
