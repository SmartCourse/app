const auth = require('./config')
const userModel = require('../models/user')()
const { ANONYMOUS } = require('../models/constants')

/**
 * If the user has lodged a get request and is
 * logged in they may pass their uid directly to get
 * more refined information from the server.
 */
function attachUser(req, next) {
    const { uid } = req.query

    if (uid) {
        return userModel.getUserByUID(uid)
            .then(user => {
                req.userID = (user && user.id) || ANONYMOUS
            })
            .catch(err => {
                console.warn(err)
            })
            .then(next)
    } else {
        req.userID = ANONYMOUS
        next()
    }
}

module.exports = function (req, _, next) {
    const authHeader = req.header('authorization')
    // no token no worries
    if (!authHeader) {
        return attachUser(req, next)
    }
    const tokenised = authHeader.split(' ')
    const [bearer, token] = tokenised

    if (!(bearer === 'Bearer' && token)) {
        return next()
    }

    // client attempting auth
    return auth.verifyIdToken(token)
        .then(decodedToken => {
            // attach user to request obj
            req.authorized = decodedToken
            return userModel.getUserByUID(decodedToken.uid)
        })
        .then(user => {
            req.user = user
        })
        .catch(err => {
            // invalid JWT
            console.warn(err.message)
        })
        .then(next)
}
