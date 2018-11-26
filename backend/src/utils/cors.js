const CORS_PREFLIGHT_METHODS = ['OPTIONS', 'HEAD']

/**
 * Basic CORS middleware handler.
 * Only use for DEV
 * @param {*} res Express Response Object
 * @param {*} next     Pass the headers to the route handlers
 */
exports.corsDev = function({ method }, res, next) {
    setCorsHeaders(method, res, next, '*')
}

exports.corsProd = function({ headers, method }, res, next) {
    let allowedDomain = 'https://smartcourse.me'
    if (headers.referer && headers.referer.startsWith('https://www.smartcourse.me')) {
        allowedDomain = 'https://www.smartcourse.me'
    }
    setCorsHeaders(method, res, next, allowedDomain)
}

function setCorsHeaders(method, res, next, allowedDomain = '*') {
    // set headers
    res.header({
        'Access-Control-Allow-Origin': allowedDomain,
        'Access-Control-Allow-Headers': 'Origin, Authorization, X-Requested-With, Content-Type, Accept',
        'Access-Control-Expose-Headers': 'Location',
        'Access-Control-Allow-Methods': 'GET, HEAD, PUT, DELETE, POST, OPTIONS'
    })

    // if options just return status
    if (CORS_PREFLIGHT_METHODS.includes(method)) {
        res.sendStatus(200)
    } else {
        next()
    }
}
