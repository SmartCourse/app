const CORS_PREFLIGHT_METHODS = ['OPTIONS', 'HEAD']
<<<<<<< HEAD
const CORS_ALLOWED_HEADERS = ['Origin', 'Authorization', 'X-Requested-With', 'Content-Type', 'Accept', 'Cache-Control'].join(', ')
=======
>>>>>>> 6067b0b906da55869d3c6fddd9503dce430ca5a7

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
<<<<<<< HEAD
        'Access-Control-Allow-Headers': CORS_ALLOWED_HEADERS,
        'Access-Control-Expose-Headers': 'Location, X-ID',
=======
        'Access-Control-Allow-Headers': 'Origin, Authorization, X-Requested-With, Content-Type, Accept',
>>>>>>> 6067b0b906da55869d3c6fddd9503dce430ca5a7
        'Access-Control-Allow-Methods': 'GET, HEAD, PUT, DELETE, POST, OPTIONS'
    })

    // if options just return status
    if (CORS_PREFLIGHT_METHODS.includes(method)) {
        res.sendStatus(200)
    } else {
        next()
    }
}

exports.CORS_ALLOWED_HEADERS = CORS_ALLOWED_HEADERS
