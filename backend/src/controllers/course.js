// TODO - MOVE TO SEPERATE FILE
const qdb = require('../models/db-questions.js')

/* Get specifc course data */
exports.getCourse = function (req, res) {
    const cid = req.params.cid
    res.send(`<h1>Course Data for Course #${cid} </h1>`)
}

/* Get all questions for a course */
exports.getCourseQuestions = function (req, res) {
    const cid = req.params.cid
    const pid = req.query.pid

    qdb.getQuestions(cid, pid)
        .then(data => res.json(data))
}

/* Get all reviews for a course */
exports.getCourseReviews = function (req, res) {
    const cid = req.params.cid
    const pid = 0 // req.query.p
    res.send(`<h1>Page Reviews for Course #${cid} Page #${pid}</h1>`)
}
