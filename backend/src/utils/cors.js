const CORS_PREFLIGHT_METHODS = ['OPTIONS', 'HEAD']
const CORS_ALLOWED_HEADERS = ['Origin', 'Authorization', 'X-Requested-With', 'Content-Type', 'Accept', 'Cache-Control'].join(', ')
const CORS_ALLOWED_DOMAINS = ['https://smartcourse.me', 'https://www.smartcourse.me', 'https://admin.smartcourse.me']

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
    let allowedDomain = CORS_ALLOWED_DOMAINS[0]
    for (let i = 1; i < CORS_ALLOWED_DOMAINS.length; ++i) {
        const domain = CORS_ALLOWED_DOMAINS[i]
        if (headers.origin && headers.origin.startsWith(domain)) {
            allowedDomain = domain
            break
        }
    }
    setCorsHeaders(method, res, next, allowedDomain)
}

function setCorsHeaders(method, res, next, allowedDomain = '*') {
    // set headers
    res.header({
        'Access-Control-Allow-Origin': allowedDomain,
        'Access-Control-Allow-Headers': CORS_ALLOWED_HEADERS,
        'Access-Control-Expose-Headers': 'Location, X-ID',
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
