
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



// following code from: http://ecmanaut.blogspot.com/2006/07/encoding-decoding-utf8-in-javascript.html
/**
 * Convert a string to utf8
 */
exports.encodeutf8 = function (s) {
  return unescape(encodeURIComponent(s));
}

/**
 * Convert a utf-8 string to a regular javascript string (utf-16 I think)
 */
exports.decodeutf8 = function (s) {
  return decodeURIComponent(escape(s));
}

exports.safeDecodeutf8 = function(s) {
    try {
        return decodeURIComponent(escape(s))
    } catch (e) {
        console.warn(e.message)
        return s.replace(/[^\x00-\x7F]/g, "");
    }
}
