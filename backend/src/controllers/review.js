const reviewModel = require('../models/review')()
const commentModel = require('../models/comment')()
const likesModel = require('../models/likes')()
const errorHandler = require('./error')
const { responseHandler } = require('../utils/helpers')

/* GET review for single id. */
exports.getReview = function ({ params }, res) {
    const getReview = Promise.all([
        reviewModel.getReview(params.id),
        likesModel.getLikes({ type: 'review', id: params.id })
    ])
        .then(([review, likes]) => { return { ...review, ...likes } })
    responseHandler(getReview, res)
        .catch(errorHandler(res))
}

/* GET top level review replies . */
exports.getReviewComments = function ({ params, query }, res) {
    responseHandler(commentModel.getComments({ reviewID: params.id }, query.p), res)
        .catch(errorHandler(res))
}

/* POST new comment. */
exports.postComment = function ({ params, body }, res) {
    responseHandler(commentModel.postComment({ reviewID: params.id }, body), res)
        .catch(errorHandler(res))
}

/* GET the likes value */
exports.getLikes = function ({ params }, res) {
    responseHandler(likesModel.getLikes({ type: 'review', id: params.id }), res)
        .catch(errorHandler(res))
}

/* PUT updated likes value */
exports.putLikes = function ({ params, body }, res) {
    responseHandler(likesModel.putLikes({ type: 'review', id: params.id, ...body }), res)
        .catch(errorHandler(res))
}
