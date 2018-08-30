const questionModel = require('../models/question')
const answerModel = require('../models/answer')

/* GET question data. */
exports.getQuestion = function ({ params }, res) {
    const questionID = params.id

    questionModel.getQuestion(questionID)
        .then(data => res.json(data))
}

/* GET question ansewrs. */
exports.getQuestionAnswers = function ({ params, query }, res) {
    const questionID = params.id
    const pageNumber = query.p

    answerModel.getAnswers(questionID, pageNumber)
        .then(data => res.json(data))
}
