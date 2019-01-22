const { ANONYMOUS } = require('../models/constants')
const reviewModel = require('../models/review')()
const commentModel = require('../models/comment')()
const likesModel = require('../models/likes')()
const userModel = require('../models/user')()
const { getResponseHandler, postResponseHandler, deleteResponseHandler, userLikesMapper } = require('../utils/helpers')
const { TABLE_NAMES } = require('../models/constants')

/* GET review for single id. */
exports.getReview = function ({ user, params }, res, next) {
    const userID = (user && user.id) || ANONYMOUS
    Promise.all([
        reviewModel.getReview(params.id),
        likesModel.getLikes({ type: TABLE_NAMES.REVIEWS, id: params.id }),
        likesModel.getUserLiked({ type: TABLE_NAMES.REVIEWS, id: params.id, userID })
    ])
        .then(([review, likes, userLiked]) => {
            return userModel.getPublicProfile(review.userID)
                .then((userInfo) => {
                    delete review.userID
                    return { ...review, ...likes, ...userLiked, user: userInfo }
                })
        })
        .then(getResponseHandler(res))
        .catch(next)
}

/* GET top level review replies . */
exports.getReviewComments = function ({ user, params, query }, res, next) {
    const userID = (user && user.id) || ANONYMOUS
    commentModel.getComments({ reviewID: params.id }, query.p)
        .then(replies => Promise.all([
            replies,
            Promise.all(
                replies.map(reply => likesModel.getLikes(
                    { type: TABLE_NAMES.COMMENTS, id: reply.id }))
            ),
            Promise.all(
                replies.map(reply => likesModel.getUserLiked(
                    { type: TABLE_NAMES.COMMENTS, id: reply.id, userID }))
            )
        ]))
        .then(([reviews, likes, userLikes]) => reviews.map(userLikesMapper(likes, userLikes)))
        .then(getResponseHandler(res))
        .catch(next)
}

/* POST new comment. */
exports.postComment = function ({ user, params, body }, res, next) {
    body.userID = user.id
    const location = `/api/course/${params.code}/review/${params.id}/comment`

    commentModel.postComment({ reviewID: params.id }, body)
        .then(postResponseHandler(location, res))
        .catch(next)
}

/* GET the likes value */
exports.getReviewLikes = function ({ params }, res, next) {
    likesModel.getLikes({ type: TABLE_NAMES.REVIEWS, id: params.id })
        .then(getResponseHandler(res))
        .catch(next)
}

/* PUT updated likes value */
exports.putReviewLikes = function ({ user, params, body }, res, next) {
    body.userID = user.id
    likesModel.putLikes({ type: TABLE_NAMES.REVIEWS, ...params, ...body })
        .then(() => exports.getReview({ user, params }, res))
        .catch(next)
}

/* GET the reply likes value */
exports.getReplyLikes = function ({ params }, res, next) {
    likesModel.getLikes({ type: TABLE_NAMES.COMMENTS, id: params.id })
        .then(getResponseHandler(res))
        .catch(next)
}

/* PUT updated reply likes value */
exports.putReplyLikes = function ({ user, params, body, query }, res, next) {
    body.userID = user.id
    likesModel.putLikes({ type: TABLE_NAMES.COMMENTS, id: params.replyID, ...body })
        .then(() => exports.getReviewComments({ user, params, query }, res))
        .catch(next)
}

/* PUT updated review body */
exports.putReview = function ({ user, params, body }, res, next) {
    body.userID = user.id
    body.permissions = user.permissions
    reviewModel.putReview(params.id, body)
        .then(() => exports.getReview({ user, params }, res))
        .catch(next)
}

/* DELETE review */
exports.deleteReview = function ({ user, params }, res, next) {
    reviewModel.deleteReview(params.id, user.id, user.permissions)
        .then(deleteResponseHandler(res))
        .catch(next)
}
