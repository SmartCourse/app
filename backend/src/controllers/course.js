const courseModel = require('../models/course')()
const questionModel = require('../models/question')()
const reviewModel = require('../models/review')()
const errorHandler = require('./error')
const { responseHandler } = require('../utils/helpers')

/* Get all course data */
exports.getCourses = function (_, res) {
    responseHandler(courseModel.getCourses(), res)
        .catch(errorHandler(res))
}

/* Get specifc course data */
exports.getCourse = function ({ params }, res) {
    responseHandler(courseModel.getCourse(params.id), res)
        .catch(errorHandler(res))
}

/* Get all questions for a course */
exports.getCourseQuestions = function ({ params, query }, res) {
    // If query 'p' is not given just use p=1
    let pageNumber = typeof query.p === 'undefined' ? 1 : parseInt(query.p)
    // Check that pageNumber is an integer
    if (isNaN(pageNumber)) {
        throw Error('Page Number is not a number')
    }
    responseHandler(questionModel.getQuestions(params.id, pageNumber), res)
        .catch(errorHandler(res))
}

/* Get all reviews for a course */
exports.getCourseReviews = function ({ params, query }, res) {
    // If query 'p' is not given just use p=1
    let pageNumber = typeof query.p === 'undefined' ? 1 : parseInt(query.p)
    // Check that pageNumber is an integer
    if (isNaN(pageNumber)) {
        throw Error('Page Number is not a number')
    }
    responseHandler(reviewModel.getReviews(params.id, pageNumber), res)
        .catch(errorHandler(res))
}

exports.postQuestion = function ({ params, body }, res) {
    // TODO fix userID
    body.userID = 1
    responseHandler(questionModel.postQuestion(params.id, body), res)
        .catch(errorHandler(res))
}

/* POST new review */
exports.postReview = function ({ params, body }, res) {
    responseHandler(reviewModel.postReview(params.id, body), res)
        .catch(errorHandler(res))
}
