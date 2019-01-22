const { ANONYMOUS } = require('../models/constants')
const questionModel = require('../models/question')()
const commentModel = require('../models/comment')()
const likesModel = require('../models/likes')()
const userModel = require('../models/user')()
const { getResponseHandler, postResponseHandler, deleteResponseHandler, userLikesMapper } = require('../utils/helpers')
const { TABLE_NAMES } = require('../models/constants')

/* GET question data. */
exports.getQuestion = function ({ user, params }, res, next) {
    const userID = (user && user.id) || ANONYMOUS
    Promise.all([
        questionModel.getQuestion(params.id),
        likesModel.getLikes({ type: TABLE_NAMES.QUESTIONS, id: params.id }),
        likesModel.getUserLiked({ type: TABLE_NAMES.QUESTIONS, id: params.id, userID })
    ])
        .then(([question, likes, userLiked]) => {
            return userModel.getPublicProfile(question.userID)
                .then((userInfo) => {
                    delete question.userID
                    return { ...question, ...likes, ...userLiked, user: userInfo }
                })
        })
        .then(getResponseHandler(res))
        .catch(next)
}

/* get the questions for a specific user */
exports.getQuestionsByUserId = function({ params: { id } }, res, next) {
    questionModel.getQuestionsByUserID(id)
        .then(getResponseHandler(res))
        .catch(next)
}

/* GET question ansewrs. */
exports.getQuestionAnswers = function ({ user, params, query }, res, next) {
    const userID = (user && user.id) || ANONYMOUS

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
        .then(getResponseHandler(res))
        .catch(next)
}

/* POST new answer. */
exports.postAnswer = function ({ user, params, query, body }, res, next) {
    body.userID = user.id
    const location = `/api/course/${params.code}/question/${params.id}/answer`

    commentModel.postComment({ questionID: params.id }, body)
        .then(postResponseHandler(location, res))
        .catch(next)
}

/* GET the question likes value */
exports.getQuestionLikes = function ({ params }, res, next) {
    likesModel.getLikes({ type: TABLE_NAMES.QUESTIONS, id: params.id })
        .then(getResponseHandler(res))
        .catch(next)
}

/* PUT updated question likes value */
exports.putQuestionLikes = function ({ user, params, body }, res, next) {
    body.userID = user.id
    likesModel.putLikes({ type: TABLE_NAMES.QUESTIONS, ...params, ...body })
        .then(() => exports.getQuestion({ user, params }, res))
        .catch(next)
}

/* GET the answer likes value */
exports.getAnswerLikes = function ({ params }, res, next) {
    likesModel.getLikes({ type: TABLE_NAMES.COMMENTS, id: params.id })
        .then(getResponseHandler(res))
        .catch(next)
}

/* PUT updated answer likes value */
exports.putAnswerLikes = function ({ user, params, body, query }, res, next) {
    body.userID = user.id
    likesModel.putLikes({ type: TABLE_NAMES.COMMENTS, id: params.answerID, ...body })
        .then(() => exports.getQuestionAnswers({ user, params, query }, res))
        .catch(next)
}

/* PUT updated question body */
exports.putQuestion = function ({ user, params, body }, res, next) {
    body.userID = user.id
    body.permissions = user.permissions
    questionModel.putQuestion(params.id, body)
        .then(() => exports.getQuestion({ user, params }, res))
        .catch(next)
}

/* DELETE question */
exports.deleteQuestion = function ({ user, params }, res, next) {
    questionModel.deleteQuestion(params.id, user.id, user.permissions)
        .then(deleteResponseHandler(res))
        .catch(next)
}
