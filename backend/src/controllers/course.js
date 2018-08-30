const courseModel = require('../models/course')
const questionModel = require('../models/question')

/* Get specifc course data */
exports.getCourse = function ({ params }, res) {
    const courseID = params.id
    
    courseModel.getCourse(courseID)
        .then(data => res.json(data))
}

/* Get all questions for a course */
exports.getCourseQuestions = function ({ params, query }, res) {
    const courseID = params.id
    const pageNumber = query.p

    questionModel.getQuestions(courseID, pageNumber)
        .then(data => res.json(data))
}

/* Get all reviews for a course */
exports.getCourseReviews = function ({ params, query }, res) {
    const courseID = params.id
    const pageNumber = query.p

    res.send(`<h1>Page Reviews for Course #${courseID} Page #${pageNumber}</h1>`)
}
