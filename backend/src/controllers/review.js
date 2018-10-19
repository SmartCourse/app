const { ANONYMOUS } = require('../models/constants')
const reviewModel = require('../models/review')()
const commentModel = require('../models/comment')()
const likesModel = require('../models/likes')()
const userModel = require('../models/user')()
const errorHandler = require('./error')
const { responseHandler, userLikesMapper } = require('../utils/helpers')

/* GET review for single id. */
exports.getReview = function ({ user, params }, res) {
    const userID = user && user.id || ANONYMOUS
    const getReview = Promise.all([
        reviewModel.getReview(params.id),
        likesModel.getLikes({ type: 'review', id: params.id }),
        likesModel.getUserLiked({ type: 'review', id: params.id, userID })
    ]).then(([review, likes, userLiked]) => {
        return userModel.getPublicProfile(review.userID)
            .then((userInfo) => {
                delete review.userID
                return { ...review, ...likes, ...userLiked, user: userInfo }
            })
    })

    responseHandler(getReview, res)
        .catch(errorHandler(res))
}

/* GET top level review replies . */
exports.getReviewComments = function ({ user, params, query }, res) {
    const userID = user && user.id || ANONYMOUS
    const getReplies = new Promise((resolve, reject) => {
        // Get the replies
        commentModel.getComments({ reviewID: params.id }, query.p)
            .then(replies => Promise.all([
                replies,
                Promise.all(
                    replies.map(reply => likesModel.getLikes(
                        { type: 'reply', id: reply.id }))
                ),
                Promise.all(
                    replies.map(reply => likesModel.getUserLiked(
                        { type: 'reply', id: reply.id, userID }))
                )
            ]))
            .then(([reviews, likes, userLikes]) => reviews.map(userLikesMapper(likes, userLikes)))
            .then(resolve)
            .catch(err => reject(err))
    })

    responseHandler(getReplies, res)
        .catch(errorHandler(res))
}

/* POST new comment. */
exports.postComment = function ({ user, params, query, body }, res) {
    body.userID = user.id
    const promise = new Promise((resolve, reject) =>
        // post the comment, then get it
        commentModel.postComment({ reviewID: params.id }, body)
            .then(comment => resolve(userLikesMapper(
                // 0 likes for new comment!
                [{ likes: 0 }], [{ userLiked: 0 }])(comment, 0, 0))
            )
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
        .then(exports.getReviewComments({ user, params, query }, res))
}
