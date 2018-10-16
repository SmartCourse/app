const { ANONYMOUS } = require('../models/constants')
const questionModel = require('../models/question')()
const commentModel = require('../models/comment')()
const likesModel = require('../models/likes')()
const errorHandler = require('./error')
const { responseHandler } = require('../utils/helpers')

/* GET question data. */
exports.getQuestion = function ({ params }, res) {
    const getQuestion = Promise.all([
        questionModel.getQuestion(params.id),
        likesModel.getLikes({ type: 'question', id: params.id })
    ])
        .then(([question, likes]) => { return { ...question, ...likes } })

    responseHandler(getQuestion, res)
        .catch(errorHandler(res))
}

/* GET question ansewrs. */
exports.getQuestionAnswers = function ({ params, query }, res) {
    let p = parseInt(query.p)
    const pageNumber = p || 1
    const pageSize = 10

    const getAnswers = Promise.all([
        commentModel.getComments({ questionID: params.id }, pageNumber, pageSize),
        commentModel.getCommentCount({ questionID: params.id })
    ]).then((values) => {
        let answers = values[0]
        const lastPage = Math.trunc((values[1][0]['COUNT()'] + pageSize - 1) / pageSize)
        const promises = answers.map(answer => likesModel.getLikes({ type: 'answer', id: answer.id }))
        return Promise.all(promises)
            .then((likes) => {
                for (var i = 0; i < answers.length; i++) {
                    answers[i].likes = likes[i].likes
                }
                return {
                    'meta': {
                        'curr': pageNumber,
                        'last': lastPage || 1,
                        'pageSize': pageSize
                    },
                    'data': answers
                }
            })
    })

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
