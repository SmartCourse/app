const { ANONYMOUS } = require('../models/constants')
const reviewModel = require('../models/review')()
const commentModel = require('../models/comment')()
const likesModel = require('../models/likes')()
const userModel = require('../models/user')()
const errorHandler = require('./error')
const { responseHandler } = require('../utils/helpers')

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
          .then((replies) => {
            return Promise.all([
              Promise.all(replies.map(reply => likesModel.getLikes({ type: 'reply', id: reply.id }))),
              Promise.all(replies.map(reply => userModel.getPublicProfile(reply.userID)))
            ])
            .then(([likes, users]) => {
              for (var i = 0; i < replies.length; i++) {
                delete replies[i].userID
                replies[i].likes = likes[i].likes
                replies[i].user = users[i]
              }
              resolve(replies)
            })
          })
          .catch(err => reject(err))
        )

    responseHandler(getReplies, res)
        .catch(errorHandler(res))
}

/* POST new comment. */
exports.postComment = function ({ user, params, query, body }, res) {
    body.userID = user && user.id || ANONYMOUS
    commentModel.postComment({ reviewID: params.id }, body)
        .then(exports.getReviewComments({ params, query }, res))
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
        .then(exports.getReviewComments({ params, query }, res))
}
