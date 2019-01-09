const commentModel = require('../models/comment')()
const likesModel = require('../models/likes')()
const { getResponseHandler, deleteResponseHandler, userLikeMapper } = require('../utils/helpers')
const { TABLE_NAMES, ANONYMOUS } = require('../models/constants')

exports.getComment = function({ params: { cid }, user }, res, next) {
    const userID = (user && user.id) || ANONYMOUS

    commentModel.getComment(cid)
        .then(comment => Promise.all([
            comment,
            likesModel.getLikes({ type: TABLE_NAMES.COMMENTS, id: cid }),
            likesModel.getUserLiked({ type: TABLE_NAMES.COMMENTS, id: cid, userID })
        ]))
        .then(([comment, { likes }, { userLiked }]) => userLikeMapper(likes, userLiked, comment))
        .then(getResponseHandler(res))
        .catch(next)
}

/* PUT updated comment body */
exports.putComment = function ({ user, params, body }, res, next) {
    body.userID = user.id
    commentModel.putComment(params.cid, body)
        .then(() => exports.getComment({ user, params }, res, next))
        .catch(next)
}

/* DELETE comment */
exports.deleteComment = function ({ user, params }, res, next) {
    commentModel.deleteComment(params.cid, user.id)
        .then(deleteResponseHandler(res))
        .catch(next)
}
