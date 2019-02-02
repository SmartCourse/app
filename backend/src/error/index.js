const { ERRORS, ERROR_CODE_MAP, BAD_REQUEST } = require('./constants')

exports.ERRORS = ERRORS

/* Error handler
 * Prints stack trace and sets response status and body
 * Reference for Express error handling:
 * https://expressjs.com/en/guide/error-handling.html
 */
exports.APIErrorHandler = function(err, req, res, next) {
    // capture stack trace here - bit of a hack to splice in correct SQL error messsages
    // TODO unhack sometime
    let stackTrace = err.stack.split('\n').slice(0, 4)

    // APIErrors will have a status
    if (!err.status) {
        let code, status, message

        // SQL errors have a number field
        if (err.number && err.number > 50000) {
            // SQL errors > 50000 exist in our error constants map
            ({ code, status, message } = ERROR_CODE_MAP[err.number - 50000])
            // set stack trace again to print the proper message
            // TODO unhack sometime
            stackTrace[0] = `${err.constructor.name}: ${message}`
        } else {
            // If it's an unexpected error, we just treat it as a 500
            ({ code, status, message } = ERRORS.MISC.UNKNOWN)
        }
        err.code = code
        err.status = status
        err.errors = []
        err.message = message
    }

    // Log stack trace
    // Just use first 3 lines because rest is usually Express internals..
    // Note that printing the stack also prints err.message
    console.error(stackTrace.join('\n'))
    console.error(`    HTTP response: ${err.status}\n    API error code: ${err.code}`)

    // Send the response
    if (err.headers) res.header(err.headers)
    res.status(err.status).json({ message: err.message, code: err.code, errors: err.errors })
}

/*
 * Create an sql throw statement based on an error
 */
exports.toSQLThrow = function(eObj) {
    // it would be annoying to escape strings for SQL here, so we grab the message
    // from the ERROR_CODE_MAP in the handler instead
    return `THROW ${eObj.code + 50000}, '', 1;`
}

/**
 * @typedef {APIError}
 * Exists so that we can put a status and code in the constructor
 * Reference for extension of Error:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
 */
class APIError extends Error {
    /**
     * Reference for design of these error fields:
     * https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api#errors
     * @param {object} options
     * @param {number} status  HTTP status code
     * @param {number} code    Error code (see above)
     * @param {string} message User-readable error message (TODO: different message displayed to user/frontend developer?)
     *  headers: mapping of header names to values if required; i.e. object to use as argument to response.header()
     *  errors: For validation errors on PUT, PATCH & POST
     *           list of { code, field, message } for each invalid field:
     * @returns {APIError}
     */
    constructor({ status = BAD_REQUEST, code = 1000, message = 'Unknown Error', headers = null, errors = [] }) {
        // Pass remaining arguments (including vendor specific ones) to parent constructor
        super(message)
        this.status = status
        this.code = code
        this.errors = errors
        this.headers = headers
    }
}
exports.APIError = APIError
