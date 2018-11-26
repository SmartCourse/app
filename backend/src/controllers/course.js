const { PAGE_SIZE } = require('../models/constants')
const courseModel = require('../models/course')()
const questionModel = require('../models/question')()
const reviewModel = require('../models/review')()
const likesModel = require('../models/likes')()
const userModel = require('../models/user')()
const errorHandler = require('./error')
const { responseHandler } = require('../utils/helpers')
const { TABLE_NAMES } = require('../models/constants')

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
    const pageNumber = parseInt(query.p) || 1
    // TODO get page size from query
    const pageSize = PAGE_SIZE

    const getCourseQuestions = Promise.all([
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
            const lastPage = Math.trunc((questionCount[0]['COUNT()'] + pageSize - 1) / pageSize)
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

    responseHandler(getCourseQuestions, res)
        .catch(errorHandler(res))
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
            const lastPage = Math.trunc((reviewCount[0]['COUNT()'] + pageSize - 1) / pageSize)
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

exports.postQuestion = function ({ user, params, body }, res) {
    body.userID = user.id
    questionModel.postQuestion(params.code, body)
        .then(qid => {
            res.set({
                'Location': `/api/course/${params.code}/question/${qid}`
            })
            res.sendStatus(201)
        })
        .catch(errorHandler(res))
}

/* POST new review */
exports.postReview = function ({ user, params, body }, res) {
    body.userID = user.id
    reviewModel.postReview(params.code, body)
        .then(rid => {
            res.set({
                'Location': `/api/course/${params.code}/review/${rid}`
            })
            res.sendStatus(201)
        })
        .catch(errorHandler(res))
}
