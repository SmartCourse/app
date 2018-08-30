const qdb = require('../models/db-questions.js')

/* GET question data. */
exports.getQuestion = function ({ params }, res) {
    const cid = params.cid
    const qid = params.id
    qdb.getQuestion(cid, qid)
        .then(data => res.json(data))
}

/* GET question ansewrs. */
exports.getQuestionAnswers = function ({ params }, res) {
    const cid = params.cid
    const qid = params.id
    const pid = 0 // req.query.p
    qdb.getAnswers(cid, qid, pid)
        .then(data => res.json(data))
}
