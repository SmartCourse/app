const reviewModel = require('../models/review')()
const commentModel = require('../models/comment')()

/* GET review for single id. */
exports.getReview = function ({ params }, res) {
    reviewModel.getReview(params.id)
        .then(data => res.json(data))
        .catch(console.warn)
}

/* GET top level review replies . */
exports.getReviewComments = function ({ params, query }, res) {
    commentModel.getComments({ reviewID: params.id }, query.p)
        .then(data => res.json(data))
}
