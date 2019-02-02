const { APIError } = require('./error')
const { PERMISSIONS_MOD } = require('../models/constants')

/**
 * Takes a successful GET response and creates
 * a function that adds the response data
 * @param   {object}   response Express response object
 * @returns {Promise}
 */
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

exports.hasFirebaseToken = function(req, res, next) {
    if (!req.authorized) {
        throw new APIError({
            status: 401,
            code: 7002,
            message: 'Unauthenticated',
            headers: { 'WWW-Authenticate': 'Bearer' }
        })
    }
    next()
}

exports.isLoggedIn = function(req, _, next) {
    // you can't do stuff unless you have a profile!
    if (!req.user) {
        throw new APIError({ status: 403, code: 7003, message: 'No user profile' })
    }
    next()
}

exports.isModOrHigher = function(req, _, next) {
    if (!req.user || req.user.permissions < PERMISSIONS_MOD) {
        throw new APIError({ status: 403, code: 1003, message: 'You can\'t do that' })
    }
    next()
}

exports.cacheResponse = function(_, res, next) {
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
 * Return a function that determines the edit and delete permissions for a post
 * and adds them as meta fields
 * Used by comment, questions and review controllers to create meta field
 * @param {number}    userPermissions permissions of the authenticated user
 * @param {number}    userID id of the authenticated user
 */
exports.postPermissionsMapper = function(userPermissions, userID) {
    return (post) => {
        let val = false

        // note that post.user.id shouldn't ever be ANONYMOUS aka 0 because mssql ids start at 1
        // so we can omit a check for ANONYMOUS or PERMISSIONS_ANON
        if (userPermissions >= PERMISSIONS_MOD) {
            val = true
        } else if (userID === post.user.id) {
            val = true
        }

        return {
            ...post,
            meta: {
                canDelete: val,
                canEdit: val
            }
        }
    }
}

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
