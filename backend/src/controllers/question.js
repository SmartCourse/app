const { ANONYMOUS } = require('../models/constants')
const questionModel = require('../models/question')()
const commentModel = require('../models/comment')()
const likesModel = require('../models/likes')()
const userModel = require('../models/user')()
const errorHandler = require('./error')
const { responseHandler, postResponseHandler, userLikesMapper } = require('../utils/helpers')
const { TABLE_NAMES } = require('../models/constants')

/* GET question data. */
exports.getQuestion = function ({ user, params }, res) {
    const userID = (user && user.id) || ANONYMOUS
    const getQuestion = Promise.all([
        questionModel.getQuestion(params.id),
        likesModel.getLikes({ type: TABLE_NAMES.QUESTIONS, id: params.id }),
        likesModel.getUserLiked({ type: TABLE_NAMES.QUESTIONS, id: params.id, userID })
    ]).then(([question, likes, userLiked]) => {
        return userModel.getPublicProfile(question.userID)
            .then((userInfo) => {
                delete question.userID
                return { ...question, ...likes, ...userLiked, user: userInfo }
            })
    })

    responseHandler(getQuestion, res)
        .catch(errorHandler(res))
}

/* get the questions for a specific user */
exports.getQuestionsByUserId = function({ params: { id } }, res) {
    const questions = questionModel.getQuestionsByUserID(id)

    responseHandler(questions, res)
        .catch(errorHandler(res))
}

/* GET question ansewrs. */
exports.getQuestionAnswers = function ({ user, params, query }, res) {
    const userID = (user && user.id) || ANONYMOUS
    const getAnswers = new Promise((resolve, reject) => {
        // Get the answers
        commentModel.getComments({ questionID: params.id }, query.p)
            .then(answers => Promise.all([
                answers,
                Promise.all(
                    answers.map(answer => likesModel.getLikes(
                        { type: TABLE_NAMES.COMMENTS, id: answer.id }))
                ),
                Promise.all(
                    answers.map(answer => likesModel.getUserLiked(
                        { type: TABLE_NAMES.COMMENTS, id: answer.id, userID }))
                )
            ]))
            .then(([answers, likes, userLikes]) => answers.map(userLikesMapper(likes, userLikes)))
            .then(resolve)
            .catch(err => reject(err))
    })

    responseHandler(getAnswers, res)
        .catch(errorHandler(res))
}

/* POST new answer. */
exports.postAnswer = function ({ user, params, query, body }, res) {
    body.userID = user.id
    const location = `/api/course/${params.code}/question/${params.id}/answers`

    commentModel.postComment({ questionID: params.id }, body)
        .then(postResponseHandler(location, res))
        .catch(errorHandler(res))
}

/* GET the question likes value */
exports.getQuestionLikes = function ({ params }, res) {
    responseHandler(likesModel.getLikes({ type: TABLE_NAMES.QUESTIONS, id: params.id }), res)
        .catch(errorHandler(res))
}

/* PUT updated question likes value */
exports.putQuestionLikes = function ({ user, params, body }, res) {
    body.userID = user.id
    likesModel.putLikes({ type: TABLE_NAMES.QUESTIONS, ...params, ...body })
        .then(() => exports.getQuestion({ user, params }, res))
}

/* GET the answer likes value */
exports.getAnswerLikes = function ({ params }, res) {
    responseHandler(likesModel.getLikes({ type: TABLE_NAMES.COMMENTS, id: params.id }), res)
        .catch(errorHandler(res))
}

/* PUT updated answer likes value */
exports.putAnswerLikes = function ({ user, params, body, query }, res) {
    body.userID = user.id
    likesModel.putLikes({ type: TABLE_NAMES.COMMENTS, id: params.answerID, ...body })
        .then(() => exports.getQuestionAnswers({ user, params, query }, res))
}
