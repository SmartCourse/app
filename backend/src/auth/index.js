const auth = require('./config')

module.exports = function (req, _, next) {
    const token = req.header('authorization')

    // no token no worries
    if (!token) {
        return next()
    }

    // client attempting auth
    console.log('HEADER:', token)
    return auth.verifyIdToken(token)
        .then(decodedToken => {
            console.log(decodedToken)
            // attach user to request obj
            req.user = decodedToken.uid
        })
        .catch(err => {
            // invalid JWT
            console.warn(err)
        })
        .finally(next)
}
