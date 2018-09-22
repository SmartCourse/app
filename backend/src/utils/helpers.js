
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
 * Convert a string to utf8
 */
exports.encodeutf8 = (s) => unescape(encodeURIComponent(s));

/**
 * Convert a utf-8 string to a regular javascript string (utf-16 I think)
 */
exports.decodeutf8 = (s) => decodeURIComponent(escape(s));

/**
 * Converts a utf-8 string to regular string, doesn't throw errors
 * This is used for description, name and requirements text fields
 */
exports.decodeUTF8Text = function(s) {
    try {
        return decodeURIComponent(escape(s))
    } catch (e) {
        console.warn(e.message)
        console.warn(s)
        // replacing non ascii characters with spaces seems to work. We could just return s too
        return s.replace(/[^\x00-\x7F]/g, ' ') // eslint-disable-line
    }
}
