const auth = require('./config')

module.exports = function (req, _, next) {
    const authHeader = req.header('authorization')
    // no token no worries
    if (!authHeader) {
        return next()
    }
    const tokenised = authHeader.split(' ')
    const [bearer, token] = tokenised

    if (!(bearer === 'Bearer' && token)) {
        return next()
    }

    // client attempting auth
    console.log('jwt:', token)
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
