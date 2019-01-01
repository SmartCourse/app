/*
 * API error codes
 * TODO error constant file
 * TODO we might want to map error codes to messages or something
 *
 * 0 - no error occurred (TODO: should this be defined?)
 * 1 - misc
 * 2 - subject
 *   200: misc subject error
 *   201: subject doesn't exist
 * 3 - course
 *   300: misc course error
 *   301: course doesn't exist
 * 4 - question
 * 5 - review
 * 6 - comment
 * 7 - user/auth
*/

/* Error handler
 * Prints stack trace and sets response status and body
 * Reference for Express error handling:
 * https://expressjs.com/en/guide/error-handling.html
 */
exports.APIErrorHandler = function(err, req, res, next) {
    // Log stack trace
    console.error(err.stack)

    // APIErrors (i.e. expected errors) will have a status
    if (!err.status) {
        // If it's an unexpected error, we just treat it as a 500
        err.code = 1
        err.status = 500
        err.errors = []
    }
    console.error(`    HTTP response: ${err.status}\n    API error code: ${err.code}`)

    // Send the response
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
     *  errors: For validation errors on PUT, PATCH & POST
    *           list of { code, field, message } for each invalid field:
     */
    constructor({ status = 400, code = 1, message = 'Unkown Error', errors = [] }) {
        // Pass remaining arguments (including vendor specific ones) to parent constructor
        super(message)
        this.status = status
        this.code = code
        this.errors = errors
    }
}
exports.APIError = APIError

/*
 * Translate result of SQL THROW statement into an API error
 *  @param {object} mapping of SQL error number to HTTP status code
 *                  supplied error numbers above 50000 are user-defined and
 *                  should map to API error codes by subtracting 50000
 */
exports.translateSQLError = function(obj) {
    return function (err) {
        if (err.number && err.number > 50000) {
            throw new APIError({ status: obj[err.number], code: err.number - 50000, message: err.message })
        } else {
            throw err
        }
    }
}
