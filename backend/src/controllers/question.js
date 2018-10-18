const questionModel = require('../models/question')()
const commentModel = require('../models/comment')()
const likesModel = require('../models/likes')()
const userModel = require('../models/user')()
const errorHandler = require('./error')
const { responseHandler, userLikesMapper } = require('../utils/helpers')

/* GET question data. */
exports.getQuestion = function ({ params }, res) {
    const getQuestion = Promise.all([
        questionModel.getQuestion(params.id),
        likesModel.getLikes({ type: 'question', id: params.id })
    ]).then(([question, likes]) => {
        return Promise.all([
            userModel.getPublicProfile(question.userID)
        ]).then(([userInfo]) => {
            delete question.userID
            return { ...question, ...likes, user: userInfo }
        })
    })

    responseHandler(getQuestion, res)
        .catch(errorHandler(res))
}

/* GET question ansewrs. */
exports.getQuestionAnswers = function ({ params, query }, res) {
    const getAnswers = new Promise((resolve, reject) =>
        // Get the answers
        commentModel.getComments({ questionID: params.id }, query.p)
            .then(answers => Promise.all([
                answers,
                Promise.all(
                    answers.map(answer => likesModel.getLikes({ type: 'answer', id: answer.id }))
                )
            ]))
            .then(([answers, likes]) => answers.map(userLikesMapper(likes)))
            .then(resolve)
            .catch(err => reject(err))
    )

    responseHandler(getAnswers, res)
        .catch(errorHandler(res))
}

/* POST new answer. */
exports.postAnswer = function ({ user, params, query, body }, res) {
    body.userID = user.id
    const promise = new Promise((resolve, reject) =>
        // Get the answers
        commentModel.postComment({ questionID: params.id }, body)
            .then(answer => resolve(userLikesMapper([{ likes: 0 }])(answer, 0))) // 0 likes for new comment!
            .catch(err => reject(err))
    )

    responseHandler(promise, res)
        .catch(errorHandler(res))
}

/* GET the question likes value */
exports.getQuestionLikes = function ({ params }, res) {
    responseHandler(likesModel.getLikes({ type: 'question', id: params.id }), res)
        .catch(errorHandler(res))
}

/* PUT updated question likes value */
exports.putQuestionLikes = function ({ user, params, body }, res) {
    body.userID = user.id
    responseHandler(likesModel.putLikes({ type: 'question', ...params, ...body }), res)
        .catch(errorHandler(res))
}

/* GET the answer likes value */
exports.getAnswerLikes = function ({ params }, res) {
    responseHandler(likesModel.getLikes({ type: 'answer', id: params.id }), res)
        .catch(errorHandler(res))
}

/* PUT updated answer likes value */
exports.putAnswerLikes = function ({ user, params, body, query }, res) {
    body.userID = user.id
    likesModel.putLikes({ type: 'answer', id: params.answerID, ...body })
        .then(exports.getQuestionAnswers({ params, query }, res))
}
