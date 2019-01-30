const commentModel = require('../models/comment')()
const likesModel = require('../models/likes')()
const { getResponseHandler, deleteResponseHandler, userLikeMapper, postPermissionsMapper } = require('../utils/helpers')
const { TABLE_NAMES, PERMISSIONS_ANON, ANONYMOUS } = require('../models/constants')

exports.getComment = function({ params: { cid }, user }, res, next) {
    const userID = (user && user.id) || ANONYMOUS
    const userPermissions = (user && user.permissions) || PERMISSIONS_ANON

    commentModel.getComment(cid)
        .then(comment => Promise.all([
            comment,
            likesModel.getLikes({ type: TABLE_NAMES.COMMENTS, id: cid }),
            likesModel.getUserLiked({ type: TABLE_NAMES.COMMENTS, id: cid, userID })
        ]))
        .then(([comment, { likes }, { userLiked }]) => userLikeMapper(likes, userLiked, comment))
        .then(postPermissionsMapper(userPermissions, userID))
        .then(getResponseHandler(res))
        .catch(next)
}

/* PUT updated comment body */
exports.putComment = function ({ user, params, body }, res, next) {
    body.userID = user.id
    body.permissions = user.permissions
    commentModel.putComment(params.cid, body)
        .then(() => exports.getComment({ user, params }, res, next))
        .catch(next)
}

/* DELETE comment */
exports.deleteComment = function ({ user, params }, res, next) {
    commentModel.deleteComment(params.cid, user.id, user.permissions)
        .then(deleteResponseHandler(res))
        .catch(next)
}
