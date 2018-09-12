
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
