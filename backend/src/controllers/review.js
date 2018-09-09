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
    responseHandler(commentModel.getComments({ reviewID: params.id }, query.p), res)
        .catch(errorHandler(res))
}
