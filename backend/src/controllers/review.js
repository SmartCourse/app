const { ANONYMOUS } = require('../models/constants')
const reviewModel = require('../models/review')()
const commentModel = require('../models/comment')()
const likesModel = require('../models/likes')()
const errorHandler = require('./error')
const { responseHandler } = require('../utils/helpers')

/* GET review for single id. */
exports.getReview = function ({ user, params }, res) {
    const userID = user && user.id || ANONYMOUS
    const getReview = Promise.all([
        reviewModel.getReview(params.id),
        likesModel.getLikes({ type: 'review', id: params.id }),
        likesModel.getUserLiked({ type: 'review', id: params.id, userID })
    ])
        .then(([review, likes, userLiked]) => { return { ...review, ...likes, ...userLiked } })

    responseHandler(getReview, res)
        .catch(errorHandler(res))
}

/* GET top level review replies . */
exports.getReviewComments = function ({ user, params, query }, res) {
    const userID = user && user.id || ANONYMOUS
    const getReplies = new Promise((resolve, reject) => {
        // Get the replies
        commentModel.getComments({ reviewID: params.id }, query.p)
            .then((replies) => {
                // Get the likes for each reply
                const likesPromises = replies.map(reply => likesModel.getLikes(
                    { type: 'reply', id: reply.id }))
                const p1 = Promise.all(likesPromises)
                    .then((likes) => {
                        for (var i = 0; i < replies.length; i++) {
                            replies[i].likes = likes[i].likes
                        }
                    })
                // Get what the user has liked for each reply
                const userLikesPromises = replies.map(reply => likesModel.getUserLiked(
                    { type: 'reply', id: reply.id, userID }))
                const p2 = Promise.all(userLikesPromises)
                    .then((likes) => {
                        for (var i = 0; i < replies.length; i++) {
                            replies[i].userLiked = likes[i].userLiked
                        }
                    })
                return Promise.all([p1, p2])
                    .then(() => resolve(replies))
            })
            .catch(err => reject(err))
    })

    responseHandler(getReplies, res)
        .catch(errorHandler(res))
}

/* POST new comment. */
exports.postComment = function ({ user, params, query, body }, res) {
    body.userID = user && user.id || ANONYMOUS
    commentModel.postComment({ reviewID: params.id }, body)
        .then(exports.getReviewComments({ user, params, query }, res))
        .catch(errorHandler(res))
}

/* GET the likes value */
exports.getReviewLikes = function ({ params }, res) {
    responseHandler(likesModel.getLikes({ type: 'review', id: params.id }), res)
        .catch(errorHandler(res))
}

/* PUT updated likes value */
exports.putReviewLikes = function ({ user, params, body }, res) {
    body.userID = user && user.id || ANONYMOUS
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
    body.userID = user && user.id || ANONYMOUS
    likesModel.putLikes({ type: 'reply', id: params.replyID, ...body })
        .then(exports.getReviewComments({ user, params, query }, res))
}
