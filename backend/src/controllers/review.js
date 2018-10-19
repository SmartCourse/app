const reviewModel = require('../models/review')()
const commentModel = require('../models/comment')()
const likesModel = require('../models/likes')()
const userModel = require('../models/user')()
const errorHandler = require('./error')
const { responseHandler, userLikesMapper } = require('../utils/helpers')

/* GET review for single id. */
exports.getReview = function ({ params }, res) {
    const getReview = Promise.all([
        reviewModel.getReview(params.id),
        likesModel.getLikes({ type: 'review', id: params.id })
    ]).then(([review, likes]) => {
        return Promise.all([
            userModel.getPublicProfile(review.userID)
        ]).then(([userInfo]) => {
            delete review.userID
            return { ...review, ...likes, user: userInfo }
        })
    })

    responseHandler(getReview, res)
        .catch(errorHandler(res))
}

/* GET top level review replies . */
exports.getReviewComments = function ({ params, query }, res) {
    const getReplies = new Promise((resolve, reject) =>
        commentModel.getComments({ reviewID: params.id }, query.p)
            .then(replies => Promise.all([
                replies,
                Promise.all(
                    replies.map(reply => likesModel.getLikes({ type: 'reply', id: reply.id }))
                )
            ]))
            .then(([reviews, likes]) => reviews.map(userLikesMapper(likes)))
            .then(resolve)
            .catch(err => reject(err))
    )

    responseHandler(getReplies, res)
        .catch(errorHandler(res))
}

/* POST new comment. */
exports.postComment = function ({ user, params, query, body }, res) {
    body.userID = user.id
    const promise = new Promise((resolve, reject) =>
        // post the comment, then get it
        commentModel.postComment({ reviewID: params.id }, body)
            .then(comment => resolve(userLikesMapper([{ likes: 0 }])(comment, 0))) // 0 likes for new comment!
            .catch(err => reject(err))
    )

    responseHandler(promise, res)
        .catch(errorHandler(res))
}

/* GET the likes value */
exports.getReviewLikes = function ({ params }, res) {
    responseHandler(likesModel.getLikes({ type: 'review', id: params.id }), res)
        .catch(errorHandler(res))
}

/* PUT updated likes value */
exports.putReviewLikes = function ({ user, params, body }, res) {
    body.userID = user.id
    responseHandler(likesModel.putLikes({ type: 'review', ...params, ...body }), res)
        .catch(errorHandler(res))
}

/* GET the reply likes value */
exports.getReplyLikes = function ({ params }, res) {
    responseHandler(likesModel.getLikes({ type: 'reply', id: params.id }), res)
        .catch(errorHandler(res))
}

/* PUT updated reply likes value */
exports.putReplyLikes = function ({ user, params, body, query }, res) {
    body.userID = user.id
    likesModel.putLikes({ type: 'reply', id: params.replyID, ...body })
        .then(exports.getReviewComments({ params, query }, res))
}
