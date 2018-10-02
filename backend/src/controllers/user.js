const errorHandler = require('./error')
const userModel = require('../models/user')()
const { responseHandler } = require('../utils/helpers')

/* Get data for a specific user */
exports.getUser = function(_, res) {
    return res.json({
        userID: 1,
        firstName: 'Walker',
        lastName: 'Francis',
        email: 'alnuno-das-hinds@gmail.com'
    })
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

exports.createUser = function({ authorized }, res) {
    return responseHandler(userModel.createUser(authorized), res)
        .catch(errorHandler(res))
}
