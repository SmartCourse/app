
const commentModel = require('../models/comment')()
const likesModel = require('../models/likes')()
const { responseHandler, userLikeMapper } = require('../utils/helpers')
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
