
const commentModel = require('../models/comment')()
const likesModel = require('../models/likes')()
const { responseHandler, deleteResponseHandler, userLikeMapper } = require('../utils/helpers')
const errorHandler = require('./error')
const { TABLE_NAMES, ANONYMOUS } = require('../models/constants')

exports.getComment = function({ params: { cid }, user }, res) {
    const userID = (user && user.id) || ANONYMOUS

    responseHandler(
        commentModel
            .getComment(cid)
            .then(comment => Promise.all([
                comment,
                likesModel.getLikes({ type: TABLE_NAMES.COMMENTS, id: cid }),
                likesModel.getUserLiked({ type: TABLE_NAMES.COMMENTS, id: cid, userID })
            ]))
            .then(([comment, { likes }, { userLiked }]) => userLikeMapper(likes, userLiked, comment)),
        res)
        .catch(errorHandler(res))
}

/* PUT updated comment body */
exports.putComment = function ({ user, params, body }, res) {
    body.userID = user.id
    commentModel.putComment(params.cid, body)
        .then(() => exports.getComment({ user, params }, res))
}

/* DELETE comment */
exports.deleteComment = function ({ user, params}, res) {
    commentModel.deleteComment(params.cid, user.id)
        .then(deleteResponseHandler(res))
        .catch(errorHandler(res))
}
