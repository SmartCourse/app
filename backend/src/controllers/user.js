const userModel = require('../models/user')()
const { getResponseHandler } = require('../utils/helpers')

/* Get data for a specific user */
exports.getUser = function({ params }, res, next) {
    return userModel.getPublicProfile(params.id)
        .then(getResponseHandler(res))
        .catch(next)
}

/**
 * user must be auth'd,
 * provide frontend with any user specific data
 */
exports.getSelf = function(req, res, next) {
    return userModel.getProfile(req.user.id)
        .then(getResponseHandler(res))
        .catch(next)
}

exports.createUser = function({ authorized: { email, uid }, body: { displayName, degree, gradYear } }, res, next) {
    return userModel.createUser({ email, uid, displayName, degree, gradYear })
        // TODO proper post response
        .then(getResponseHandler(res))
        .catch(next)
}

exports.updateUser = function({ user: { id }, body: { degree, gradYear, description, picture } }, res, next) {
    return userModel.updateUser(id, { degree, gradYear, description, picture })
        // TODO clean up put response...
        .then(getResponseHandler(res))
        .catch(next)
}
