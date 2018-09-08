const courseModel = require('../models/course')()
const questionModel = require('../models/question')()

/* Get all course data */
exports.getCourses = function (req, res) {
    courseModel.getCourses()
        .then(data => res.json(data))
        .catch(console.warn)
}

/* Get specifc course data */
exports.getCourse = function ({ params }, res) {
    courseModel.getCourse(params.id)
        .then(data => res.json(data))
        .catch(console.warn)
}

/* Get all questions for a course */
exports.getCourseQuestions = function ({ params, query }, res) {
    questionModel.getQuestions(params.id, query.p)
        .then(data => res.json(data))
        .catch(console.warn)
}

/* Get all reviews for a course */
exports.getCourseReviews = function ({ params, query }, res) {
    res.send([{id:1, title:'placeholder', body:'placeholder', author:1, likes:10}])
}

exports.postQuestion = function ({ params, body }, res) {
    // TODO fix userID
    body.userID = 1
    questionModel.postQuestion(params.id, body)
        .then(data => res.json(data))
        // TODO potentially more meaningful error code or something
        .catch(error => res.status(400).json({ code: 400, message: error.message }))
}
