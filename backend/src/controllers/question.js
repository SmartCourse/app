const questionModel = require('../models/question')
const answerModel = require('../models/answer')

/* GET question data. */
exports.getQuestion = function ({ params }, res) {
    questionModel.getQuestion(params.id)
        .then(data => res.json(data))
        .catch(console.warn)
}

/* GET question ansewrs. */
exports.getQuestionAnswers = function ({ params, query }, res) {
    answerModel.getAnswers(params.id, query.p)
        .then(data => res.json(data))
}

/* POST new answer. */
exports.postAnswer = function ({ params, body }, res) {
    answerModel.postAnswer(params.id, body)
        .then(data => res.json(data))
        .catch(console.warn)
}
