
exports.errorHandler = function(err, req, res, next) {
    console.error(err)
    res.status(err.status).json({ message: err.message, code: err.code })
}

/* Reference:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
 */
exports.APIError = class APIError extends Error {
    constructor(status = 400, code = 1, ...params) {
        // Pass remaining arguments (including vendor specific ones) to parent constructor
        super(...params)

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, APIError)
        }

        this.status = status
        this.code = code
    }
}
