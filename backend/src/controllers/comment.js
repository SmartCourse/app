
const commentModel = require('../models/comment')()
const { responseHandler } = require('../utils/helpers')
const errorHandler = require('./error')

exports.getComment = function({ params: { cid } }, res) {
    responseHandler(commentModel.getComment(cid), res)
        .catch(errorHandler(res))
}
