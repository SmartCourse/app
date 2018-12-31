const { PAGE_SIZE } = require('../models/constants')
const courseModel = require('../models/course')()
const questionModel = require('../models/question')()
const reviewModel = require('../models/review')()
const likesModel = require('../models/likes')()
const userModel = require('../models/user')()
const errorHandler = require('./error')
const { responseHandler, getResponseHandler, postResponseHandler } = require('../utils/helpers')
const { TABLE_NAMES } = require('../models/constants')

/* Get all course data */
exports.getCourses = function (_, res, next) {
    courseModel.getCourses()
        .then(getResponseHandler(res))
        .catch(next)
}

/* Get specifc course data */
exports.getCourse = function ({ params }, res, next) {
    courseModel.getCourse(params.code)
        .then(getResponseHandler(res))
        .catch(next)
}

/* Get all questions for a course */
exports.getCourseQuestions = function ({ params, query }, res, next) {
    const pageNumber = parseInt(query.p) || 1
    // TODO get page size from query
    const pageSize = PAGE_SIZE

    Promise.all([
        questionModel.getQuestions(params.code, pageNumber, pageSize),
        questionModel.getQuestionCount(params.code)
    ]).then(function([questions, questionCount]) {
        return Promise.all([
            Promise.all(questions.map(question => likesModel.getLikes({ type: TABLE_NAMES.QUESTIONS, id: question.id }))),
            Promise.all(questions.map(question => userModel.getPublicProfile(question.userID)))
        ]).then(([likes, users]) => {
            for (var i = 0; i < questions.length; i++) {
                delete questions[i].userID
                questions[i].likes = likes[i].likes
                questions[i].user = users[i]
            }
            const lastPage = Math.trunc((questionCount['COUNT'] + pageSize - 1) / pageSize)
            return {
                meta: {
                    curr: pageNumber,
                    last: lastPage || 1,
                    pageSize
                },
                data: questions
            }
        })
    })
        .then(getResponseHandler(res))
        .catch(next)
}

/* Get all reviews for a course */
exports.getCourseReviews = function ({ params, query }, res) {
    const pageNumber = parseInt(query.p) || 1
    // TODO get page size from query
    const pageSize = PAGE_SIZE

    const getCourseReviews = Promise.all([
        reviewModel.getReviews(params.code, pageNumber, pageSize),
        reviewModel.getReviewCount(params.code)
    ]).then(function([reviews, reviewCount]) {
        return Promise.all([
            Promise.all(reviews.map(review => likesModel.getLikes({ type: TABLE_NAMES.REVIEWS, id: review.id }))),
            Promise.all(reviews.map(review => userModel.getPublicProfile(review.userID)))
        ]).then(([likes, users]) => {
            for (var i = 0; i < reviews.length; i++) {
                delete reviews[i].userID
                reviews[i].likes = likes[i].likes
                reviews[i].user = users[i]
            }
            const lastPage = Math.trunc((reviewCount['COUNT'] + pageSize - 1) / pageSize)
            return {
                meta: {
                    curr: pageNumber,
                    last: lastPage || 1,
                    pageSize
                },
                data: reviews
            }
        })
    })

    responseHandler(getCourseReviews, res)
        .catch(errorHandler(res))
}

/* POST new question and if successful return 201 status */
exports.postQuestion = function ({ user, params, body }, res) {
    body.userID = user.id
    const location = `/api/course/${params.code}/question`
    questionModel.postQuestion(params.code, body)
        .then(postResponseHandler(location, res))
        .catch(errorHandler(res))
}

/* POST new review and if successful return 201 status */
exports.postReview = function ({ user, params, body }, res) {
    body.userID = user.id
    const location = `/api/course/${params.code}/review`
    reviewModel.postReview(params.code, body)
        .then(postResponseHandler(location, res))
        .catch(errorHandler(res))
}
