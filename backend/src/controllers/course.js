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
    if (typeof query.p !== 'number') {
        throw Error
    }
    responseHandler(questionModel.getQuestions(params.id, query.p), res)
        .catch(errorHandler(res))
}

/* Get all reviews for a course */
exports.getCourseReviews = function ({ params, query }, res) {
    // Check that p is an integer
    if (typeof query.p !== 'number') {
        throw Error
    }
    responseHandler(reviewModel.getReviews(params.id, query.p), res)
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
