
/**
 * Basic CORS middleware handler.
 * Only use for DEV
 * @param {*} res Express Response Object
 * @param {*} next     Pass the headers to the route handlers
 */
exports.cors = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, Authorization, X-Requested-With, Content-Type, Accept')
    res.header('Access-Control-Allow-Methods', 'GET, HEAD, PUT, DELETE, POST, OPTIONS')
    // intercepts OPTIONS method
    if (req.method === 'OPTIONS') {
        res.sendStatus(200)
    } else {
        next()
    }
}

exports.corsProd = function(req, res, next) {
    let allowDomain = 'https://smartcourse.me'
    if (req.headers.referer && req.headers.referer.startsWith('https://www.smartcourse.me')) {
        allowDomain = 'https://www.smartcourse.me'
    }
    res.header('Access-Control-Allow-Origin', allowDomain)
    res.header('Access-Control-Allow-Headers', 'Origin, Authorization, X-Requested-With, Content-Type, Accept')
    res.header('Access-Control-Allow-Methods', 'GET, HEAD, PUT, DELETE, POST, OPTIONS')
    // intercepts OPTIONS method
    if (req.method === 'OPTIONS') {
        res.sendStatus(200)
    } else {
        next()
    }
}
