/*
 * API error codes
 * TODO error constant file
 * TODO we might want to map error codes to messages or something
 *
 * 1000 - misc
 *   1001:
 *   1002: validation error
 *   1003: authorization: you don't have permission to do that!
 * 2000 - subject
 *   2001: subject doesn't exist
 * 3000 - course
 *   3001: course doesn't exist
 * 4000 - question
 *   4001: question doesn't exist
 *   4002: invalid title
 *   4003: invalid body
 * 5000 - review
 *   5001: review doesn't exist
 *   5002: invalid title
 *   5003: invalid body
 *   5004: invalid recommend
 *   5005: invalid enjoy
 *   5006: invalid difficulty/teaching/workload
 * 6000 - comment
 *   6001: comment doesn't exist
 *   6002: invalid body
 * 7000 - user/auth
 *   7001: user doesn't exist
 *   7002: not authenticated because of missing or malformed firebase token
 *   7003: authenticated, but not authorized because you need to create a profile
 *   7004: invalid display name
 *   7005: invalid degree
 *   7006: invalid graduation year
 * 8000 - report
 *   8001:
 *   8002: invalid reason
 *   8003: single user can't report a post more than once
*/

/* Error handler
 * Prints stack trace and sets response status and body
 * Reference for Express error handling:
 * https://expressjs.com/en/guide/error-handling.html
 */
exports.APIErrorHandler = function(err, req, res, next) {
    // Log stack trace
    // Just use first 3 lines because rest is usually Express internals..
    // Note that printing the stack also prints err.message
    console.error(err.stack.split('\n').slice(0, 4).join('\n'))

    // APIErrors (i.e. expected errors) will have a status
    if (!err.status) {
        // If it's an unexpected error, we just treat it as a 500
        err.code = 1000
        err.status = 500
        err.errors = []
        err.message = 'Unknown Error'
    }
    console.error(`    HTTP response: ${err.status}\n    API error code: ${err.code}`)

    // Send the response
    if (err.headers) res.header(err.headers)
    res.status(err.status).json({ message: err.message, code: err.code, errors: err.errors })
}

/*
 * APIError
 * Exists so that we can put a status and code in the constructor
 * Reference for extension of Error:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
 */
class APIError extends Error {
    /*
     * Reference for design of these error fields:
     * https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api#errors
     * @param {object}
     *  status: HTTP status code
     *  code: Error code (see above)
     *  message: User-readable error message (TODO: different message displayed to user/frontend developer?)
     *  headers: mapping of header names to values if required; i.e. object to use as argument to response.header()
     *  errors: For validation errors on PUT, PATCH & POST
    *           list of { code, field, message } for each invalid field:
     */
    constructor({ status = 400, code = 1000, message = 'Unknown Error', headers = null, errors = [] }) {
        // Pass remaining arguments (including vendor specific ones) to parent constructor
        super(message)
        this.status = status
        this.code = code
        this.errors = errors
        this.headers = headers
    }
}
exports.APIError = APIError

/*
 * Translate an API error code to one that will work in an SQL THROW statement
 */
exports.toSQLErrorCode = function(code) {
    return code + 50000
}

/*
 * Translate result of SQL THROW statement into an API error
 * @param {object} mapping of SQL error number to HTTP status code
 *                 supplied error numbers above 50000 are user-defined and
 *                 should map to API error codes by subtracting 50000
 */
exports.translateSQLError = function(obj) {
    return function (err) {
        if (err.number && err.number > 50000) {
            throw new APIError({ status: obj[err.number], code: err.number - 50000, message: err.message })
        } else {
            // In case some unexpected SQL error occurred, we just throw it
            throw err
        }
    }
}
