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
    responseHandler(courseModel.getCourse(params.code), res)
        .catch(errorHandler(res))
}

/* Get all questions for a course */
exports.getCourseQuestions = function ({ params, query }, res) {
    let p = parseInt(query.p)
    const pageNumber = p || 1
    const pageSize = 10

    const getCourseQuestions = new Promise((resolve, reject) => {
        Promise.all([
            questionModel.getQuestions(params.code, pageNumber, pageSize),
            questionModel.getQuestionCount(params.code)
        ]).then(function(values) {
            const lastPage = Math.trunc((values[1][0]['COUNT()'] + pageSize - 1) / pageSize)
            resolve({
                'meta': {
                    'curr': pageNumber,
                    'last': lastPage,
                    'pageSize': pageSize
                },
                'data': values[0]
            })
        })
    })

    responseHandler(getCourseQuestions, res)
        .catch(errorHandler(res))
}

/* Get all reviews for a course */
exports.getCourseReviews = function ({ params, query }, res) {
    let p = parseInt(query.p)
    const pageNumber = p || 1
    const pageSize = 10

    const getCourseReviews = new Promise((resolve, reject) => {
        Promise.all([
            reviewModel.getReviews(params.code, pageNumber, pageSize),
            reviewModel.getReviewCount(params.code)
        ]).then(function(values) {
            const lastPage = Math.trunc((values[1][0]['COUNT()'] + pageSize - 1) / pageSize)
            resolve({
                'meta': {
                    'curr': pageNumber,
                    'last': lastPage,
                    'pageSize': pageSize
                },
                'data': values[0]
            })
        })
    })

    responseHandler(getCourseReviews, res)
        .catch(errorHandler(res))
}

exports.postQuestion = function ({ user, params, body }, res) {
    // TODO fix userID
    body.userID = 1
    if (user) body.userID = user.id
    responseHandler(questionModel.postQuestion(params.code, body), res)
        .catch(errorHandler(res))
}

/* POST new review */
exports.postReview = function ({ params, body }, res) {
    responseHandler(reviewModel.postReview(params.code, body), res)
        .catch(errorHandler(res))
}
