const { ANONYMOUS, PAGE_SIZE } = require('../models/constants')
const courseModel = require('../models/course')()
const questionModel = require('../models/question')()
const reviewModel = require('../models/review')()
const likesModel = require('../models/likes')()
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
    const pageNumber = parseInt(query.p) || 1
    // TODO get page size from query
    const pageSize = PAGE_SIZE

    const getCourseQuestions = Promise.all([
        questionModel.getQuestions(params.code, pageNumber, pageSize),
        questionModel.getQuestionCount(params.code)
    ]).then(([questions, questionCount]) => {
        // Get the likes for each question
        const promises = questions.map(question => likesModel.getLikes({ type: 'question', id: question.id }))
        return Promise.all(promises)
            .then((likes) => {
                for (var i = 0; i < questions.length; i++) {
                    questions[i].likes = likes[i].likes
                }
                const lastPage = Math.trunc((questionCount[0]['COUNT()'] + pageSize -1) / pageSize)
                return {
                    'meta': {
                        'curr': pageNumber,
                        'last': lastPage || 1,
                        'pageSize': pageSize
                    },
                    'data': questions
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

    const getCourseReviews = new Promise((resolve, reject) => {
        Promise.all([
            reviewModel.getReviews(params.code, pageNumber, pageSize),
            reviewModel.getReviewCount(params.code)
        ]).then(([reviews, reviewCount]) => {
            // Get the likes for each review
            const promises = reviews.map(review => likesModel.getLikes({ type: 'review', id: review.id }))
            return Promise.all(promises)
                .then((likes) => {
                    for (var i = 0; i < reviews.length; i++) {
                        reviews[i].likes = likes[i].likes
                    }
                    const lastPage = Math.trunc((reviewCount[0]['COUNT()'] + pageSize -1) / pageSize)
                    resolve({
                        'meta': {
                            'curr': pageNumber,
                            'last': lastPage || 1,
                            'pageSize': pageSize
                        },
                        'data': reviews
                    })
                })
        })
    })

    responseHandler(getCourseReviews, res)
        .catch(errorHandler(res))
}

exports.postQuestion = function ({ user, params, body }, res) {
    body.userID = user && user.id || ANONYMOUS
    responseHandler(questionModel.postQuestion(params.code, body), res)
        .catch(errorHandler(res))
}

/* POST new review */
exports.postReview = function ({ user, params, body }, res) {
    body.userID = user && user.id || ANONYMOUS
    responseHandler(reviewModel.postReview(params.code, body), res)
        .catch(errorHandler(res))
}
