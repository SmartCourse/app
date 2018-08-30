const sqlDB = require('../models/db')

const questionModel = require('../models/question')
const answerModel = require('../models/answer')

/* GET question data. */
exports.getQuestion = function ({ params }, res) {
    const questionID = params.id

    questionModel.getQuestion(sqlDB.db, questionID)
        .then(data => res.json(data))
}

/* GET question ansewrs. */
exports.getQuestionAnswers = function ({ params, query }, res) {
    const questionID = params.id
    const pageNumber = query.p

    answerModel.getAnswers(sqlDB.db, questionID, pageNumber)
        .then(data => res.json(data))
}
