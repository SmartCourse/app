const reviewModel = require('../models/review')()
const commentModel = require('../models/comment')()
const errorHandler = require('./error')
const { responseHandler } = require('../utils/helpers')

/* GET review for single id. */
exports.getReview = function ({ params }, res) {
    responseHandler(reviewModel.getReview(params.id), res)
        .catch(errorHandler(res))
}

/* GET top level review replies . */
exports.getReviewComments = function ({ params, query }, res) {
    let p = parseInt(query.p)
    const pageNumber = p || 1
    const pageSize = 2

    const getReviewComments = new Promise((resolve, reject) => {
        Promise.all([
            commentModel.getComments({ reviewID: params.id }, pageNumber, pageSize),
            commentModel.getCommentCount({ reviewID: params.id })
        ]).then(function(values) {
            console.log(values)
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

    responseHandler(getReviewComments, res)
        .catch(errorHandler(res))
}

/* POST new comment. */
exports.postComment = function ({ params, body }, res) {
    responseHandler(commentModel.postComment({ reviewID: params.id }, body), res)
        .catch(errorHandler(res))
}
