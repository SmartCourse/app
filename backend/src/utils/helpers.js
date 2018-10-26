const { ANONYMOUS } = require('../models/constants')
const User = require('../models/user')()

/**
 * Basic response wrapper for controllers
 * @param   {function} fn       A controller function (must return a promise)
 * @param   {object}   response Express response object
 * @returns {Promise}
 */
exports.responseHandler = function(fn, response) {
    return fn.then(data => response.json(data))
}

exports.toLowerCase = str => str.toLowerCase()

/**
 * Some requests will have the auth token, but no user created.
 * Eg. Pre profile creation
 */
exports.isFirebaseAuthorized = function(req, res, next) {
    if (!req.authorized) {
        return res.status(401).json({ code: 401, message: 'Unauthorized' })
    }
    next()
}

exports.attachUser = function(req, _, next) {
    const { uid } = req.query

    if (uid) {
        console.log('USER', User.db)
        return User.getUserByUID(uid)
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

exports.isLoggedIn = function(req, res, next) {
    if (!req.user) {
        return res.status(403).json({ code: 403, message: 'No user profile' })
    }
    next()
}

exports.cacheResponse = function(req, res, next) {
    res.set({ 'Cache-Control': 'public, max-age=31557600' })
    next()
}

exports.userLikesMapper = (likes, userLikes) => (
    {
        userID,
        displayName,
        reputation,
        degree,
        gradYear,
        picture,
        joined,
        ...rest
    },
    index
) => ({
    likes: likes[index].likes,
    userLiked: userLikes[index].userLiked,
    user: {
        id: userID,
        displayName,
        ...(reputation >= 0 ? { reputation } : { 'reputation': 0 }),
        degree,
        gradYear,
        picture,
        joined
    },
    ...rest
})

/**
 * Convert a string to utf8
 */
exports.encodeutf8 = (s) => unescape(encodeURIComponent(s))

/**
 * Convert a utf-8 string to a regular javascript string (utf-16 I think)
 */
exports.decodeutf8 = (s) => decodeURIComponent(escape(s))

/**
 * Converts a utf-8 string to regular string, doesn't throw errors
 * This is used for description, name and requirements text fields
 */
exports.decodeUTF8Text = function(s) {
    try {
        return decodeURIComponent(escape(s))
    } catch (e) {
        console.warn(e.message)
        // replacing non ascii characters with spaces seems to work. We could just return s too
        return s.replace(/[^\x00-\x7F]/g, ' ') // eslint-disable-line
    }
}
