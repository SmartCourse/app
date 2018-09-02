
/**
 * Basic CORS middleware handler.
 * Only use for DEV
 * @param {*} response Express Response Object
 * @param {*} next     Pass the headers to the route handlers
 */
exports.cors = function(_, response, next) {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
}
