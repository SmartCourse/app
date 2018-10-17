const { ANONYMOUS } = require('../models/constants')
const questionModel = require('../models/question')()
const commentModel = require('../models/comment')()
const likesModel = require('../models/likes')()
const userModel = require('../models/user')()
const errorHandler = require('./error')
const { responseHandler } = require('../utils/helpers')

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
            .then((answers) => {
                return Promise.all([
                    Promise.all(answers.map(answer => likesModel.getLikes({ type: 'answer', id: answer.id }))),
                    Promise.all(answers.map(answer => userModel.getPublicProfile(answer.userID)))
                ]).then(([likes, users]) => {
                    for (var i = 0; i < answers.length; i++) {
                        delete answers[i].userID
                        answers[i].likes = likes[i].likes
                        answers[i].user = users[i]
                    }
                    console.log(answers);
                    resolve(answers)
                })
            })
            .catch(err => reject(err))
    )

    responseHandler(getAnswers, res)
        .catch(errorHandler(res))
}

/* POST new answer. */
exports.postAnswer = function ({ user, params, query, body }, res) {
    body.userID = user && user.id || ANONYMOUS
    commentModel.postComment({ questionID: params.id }, body)
        .then(exports.getQuestionAnswers({ params, query }, res))
        .catch(errorHandler(res))
}

/* GET the question likes value */
exports.getQuestionLikes = function ({ params }, res) {
    responseHandler(likesModel.getLikes({ type: 'question', id: params.id }), res)
        .catch(errorHandler(res))
}

/* PUT updated question likes value */
exports.putQuestionLikes = function ({ user, params, body }, res) {
    body.userID = user && user.id || ANONYMOUS
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
    body.userID = user && user.id || ANONYMOUS
    likesModel.putLikes({ type: 'answer', id: params.answerID, ...body })
        .then(exports.getQuestionAnswers({ params, query }, res))
}
