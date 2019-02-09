const CORS_PREFLIGHT_METHODS = ['OPTIONS', 'HEAD']
const CORS_ALLOWED_HEADERS = ['Origin', 'Authorization', 'X-Requested-With', 'Content-Type', 'Accept', 'Cache-Control'].join(', ')
const CORS_ALLOWED_DOMAINS = ['https://smartcourse.me', 'https://www.smartcourse.me', 'https://admin.smartcourse.me', 'http://localhost:8080']

/**
 * Basic CORS middleware handler.
 * Only use for DEV
 * @param {*} res Express Response Object
 * @param {*} next     Pass the headers to the route handlers
 */
exports.corsDev = function(req, res, next) {
    setCorsHeaders(req.method, res, next, '*')
}

exports.corsProd = function(req, res, next) {
    const origin = req.header('origin')
    const allowedDomain = CORS_ALLOWED_DOMAINS.find(domain => origin && origin.startsWith(domain)) || CORS_ALLOWED_DOMAINS[0]
    setCorsHeaders(req.method, res, next, allowedDomain)
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
