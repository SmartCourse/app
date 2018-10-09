const questionModel = require('../models/question')()
const commentModel = require('../models/comment')()
const errorHandler = require('./error')
const { responseHandler } = require('../utils/helpers')

/* GET question data. */
exports.getQuestion = function ({ params }, res) {
    responseHandler(questionModel.getQuestion(params.id), res)
        .catch(errorHandler(res))
}

/* GET question ansewrs. */
exports.getQuestionAnswers = function ({ params, query }, res) {
    let p = parseInt(query.p)
    const pageNumber = p || 1
    const pageSize = 10

    const getQuestionAnswers = Promise.all([
        commentModel.getComments({ questionID: params.id }, pageNumber, pageSize),
        commentModel.getCommentCount({ questionID: params.id })
    ]).then((values) => {
        const lastPage = Math.trunc((values[1][0]['COUNT()'] + pageSize) / pageSize)
        return {
            'meta': {
                'curr': pageNumber,
                'last': lastPage,
                'pageSize': pageSize
            },
            'data': values[0]
        }
    })

    responseHandler(getQuestionAnswers, res)
        .catch(errorHandler(res))
}

/* POST new answer. */
exports.postAnswer = function ({ params, body }, res) {
    responseHandler(commentModel.postComment({ questionID: params.id }, body), res)
        .catch(errorHandler(res))
}
