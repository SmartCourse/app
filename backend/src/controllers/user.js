const errorHandler = require('./error')
const userModel = require('../models/user')()
const { responseHandler } = require('../utils/helpers')

/* Get data for a specific user */
exports.getUser = function({id}, res) {
    return responseHandler(userModel.getPublicProfile(id), res)
        .catch(errorHandler(res))
}

/**
 * user must be auth'd,
 * provide frontend with any user specific data
 */
exports.getSelf = function(req, res) {
    const errorResponse = errorHandler(res)
    if (!req.user) {
        return errorResponse({ message: 'Invalid Credentials' })
    }
    // fine for now, should include profile data
    return res.json(req.user)
}

exports.createUser = function({ authorized: { email, uid }, body: { displayName } }, res) {
    return responseHandler(userModel.createUser({ email, uid, displayName }), res)
        .catch(errorHandler(res))
}
