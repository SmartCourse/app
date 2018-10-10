const { ANONYMOUS } = require('../models/constants')
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
    let p = parseInt(query.p)
    const pageNumber = p || 1
    const pageSize = 10

    const getReplies = Promise.all([
        commentModel.getComments({ reviewID: params.id }, pageNumber, pageSize),
        commentModel.getCommentCount({ reviewID: params.id })
    ]).then((values) => {
        let replies = values[0]
        const lastPage = Math.trunc((values[1][0]['COUNT()'] + pageSize - 1) / pageSize)
        const promises = replies.map(reply => likesModel.getLikes({ type: 'reply', id: reply.id }))
        return Promise.all(promises)
            .then((likes) => {
                for (var i = 0; i < replies.length; i++) {
                    replies[i].likes = likes[i].likes
                }
                return {
                    'meta': {
                        'curr': pageNumber,
                        'last': lastPage || 1,
                        'pageSize': pageSize
                    },
                    'data': replies
                }
            })
    })

    responseHandler(getReplies, res)
        .catch(errorHandler(res))
}

/* POST new comment. */
exports.postComment = function ({ user, params, query, body }, res) {
    body.userID = user || ANONYMOUS
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
    body.userID = user || ANONYMOUS
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
    body.userID = user || ANONYMOUS
    likesModel.putLikes({ type: 'reply', id: params.replyID, ...body })
        .then(exports.getReviewComments({ params, query }, res))
}
