const errorHandler = require('./error')
const userModel = require('../models/user')()
const { responseHandler } = require('../utils/helpers')

/* Get data for a specific user */
exports.getUser = function({ params }, res) {
    return responseHandler(userModel.getPublicProfile(params.id), res)
        .catch(errorHandler(res))
}

/**
 * user must be auth'd,
 * provide frontend with any user specific data
 */
exports.getSelf = function(req, res) {
    return responseHandler(userModel.getProfile(req.user.id), res)
        .catch(errorHandler(res))
}

exports.createUser = function({ authorized: { email, uid }, body: { displayName, degree, gradYear } }, res) {
    return responseHandler(userModel.createUser({ email, uid, displayName, degree, gradYear }), res)
        .catch(errorHandler(res))
}

exports.updateUser = function({ user: { id }, body: { degree, gradYear, description, picture } }, res) {
    return responseHandler(userModel.updateUser(id, { degree, gradYear, description, picture }), res)
        .catch(errorHandler(res))
}
