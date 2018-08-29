const qdb = require('../models/db-questions.js')

/* GET question data. */
exports.getQuestion = function (req, res) {
    const course_id = req.params.cid
    const question_id = req.params.id
    qdb.getQuestion(course_id, question_id)
        .then(data => res.json(data))
}

/* GET question ansewrs. */
exports.getQuestionAnswers = function (req, res) {
    const course_id = req.params.cid
    const question_id = req.params.id
    const page_id = 0 // req.query.p
    qdb.getAnswers(course_id, question_id, page_id)
        .then(data => res.json(data))
}
