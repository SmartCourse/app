const { APIError } = require('./error')

/**
 * Basic JSON response wrapper for controllers
 * @param   {function} fn       A controller function (must return a promise)
 * @param   {object}   response Express response object
 * @returns {Promise}
 */
exports.responseHandler = function(fn, response) {
    return fn.then(data => response.json(data))
}

exports.getResponseHandler = function(response) {
    return data => { response.json(data) }
}

/**
 * given a POST successful post request
 * create a 201 response, and set headers
 * for Location and X-ID to the location of
 * the new resource and the id of the resource
 * @param {string}           location The root url of the new resource
 * @param {Express.Response} response The express response object
 */
exports.postResponseHandler = function(location, response) {
    return id => {
        response.set({
            'X-ID': id,
            'Location': `${location}/${id}`
        })
        response.sendStatus(201)
    }
}

/**
 * given a DELETE successful delete request
 * create a 204 response with an empty body
 * @param {Express.Response} response The express response object
 */
exports.deleteResponseHandler = function(response) {
    return () => {
        response.sendStatus(204)
    }
}

exports.toLowerCase = str => str.toLowerCase()

exports.isFirebaseAuthorized = function(req, res, next) {
    if (!req.authorized) {
        throw new APIError({ status: 401, code: 7002, message: 'Unauthorized' })
    }
    next()
}

exports.isAuthorized = function(req, res, next) {
    if (!req.user) {
        throw new APIError({ status: 403, code: 7003, message: 'No user profile' })
    }
    next()
}

exports.cacheResponse = function(req, res, next) {
    res.set({ 'Cache-Control': 'public, max-age=31557600' })
    next()
}

/**
 * @param {Array} likes     The likes for each object
 * @param {Array} userLikes The user likes for each object
 */
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
        ...(reputation >= 0 ? { reputation } : { reputation: 0 }),
        degree,
        gradYear,
        picture,
        joined
    },
    ...rest
})

exports.userLikeMapper = (likes, userLiked, {
    userID,
    displayName,
    reputation,
    degree,
    gradYear,
    picture,
    joined,
    ...rest
}) => ({
    likes,
    userLiked,
    user: {
        id: userID,
        displayName,
        ...(reputation >= 0 ? { reputation } : { reputation: 0 }),
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

/**
 * From MDN web docs:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 */
exports.getRandomIntInclusive = function(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min // The maximum is inclusive and the minimum is inclusive
}

exports.getRandomInt = function(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min // The maximum is exclusive and the minimum is inclusive
}
