const BAD_REQUEST = 400
const UNAUTHENTICATED = 401
const FORBIDDEN = 403
const RESOURCE_NOT_FOUND = 404
const SERVER_ERROR = 500

exports.BAD_REQUEST = BAD_REQUEST
exports.UNAUTHENTICATED = UNAUTHENTICATED
exports.FORBIDDEN = FORBIDDEN
exports.RESOURCE_NOT_FOUND = RESOURCE_NOT_FOUND
exports.SERVER_ERROR = SERVER_ERROR
/*
 * 7000 - user/auth
 *   7001: user doesn't exist
 *   7002: not authenticated because of missing or malformed firebase token
 *   7003: authenticated, but not authorized because you need to create a profile
 *   7004: invalid display name
 *   7005: invalid degree
 *   7006: invalid graduation year
*/
exports.ERRORS = {
    MISC: {
        UNKNOWN: {
            status: SERVER_ERROR,
            code: 1000,
            message: 'Unknown error'
        },
        VALIDATION: {
            status: BAD_REQUEST,
            code: 1002,
            message: 'Validation error'
        },
        AUTHORIZATION: {
            code: 1003,
            status: FORBIDDEN,
            message: 'Authorization error. You have insufficient permissions.'
        }
    },
    SUBJECT: {
        MISSING: {
            status: RESOURCE_NOT_FOUND,
            code: 2001,
            message: 'Subject doesn\'t exist'
        }
    },
    COURSE: {
        MISSING: {
            status: RESOURCE_NOT_FOUND,
            code: 3001,
            message: 'Course doesn\'t exist'
        }
    },
    QUESTION: {
        BAD_REQUEST: {
            code: 4000,
            status: BAD_REQUEST,
            message: 'Malformed request'
        },
        MISSING: {
            code: 4001,
            status: RESOURCE_NOT_FOUND,
            message: 'Question doesn\'t exist'
        },
        NO_TITLE: {
            code: 4002,
            status: BAD_REQUEST,
            message: 'Question must have a title'
        },
        NO_BODY: {
            code: 4003,
            status: BAD_REQUEST,
            message: 'Question must have a body'
        }
    },
    REVIEW: {
        MISSING: {
            status: RESOURCE_NOT_FOUND,
            code: 5001,
            message: 'Review doesn\'t exist'
        },
        NO_TITLE: {
            code: 5002,
            message: 'Review must have a title'
        },
        NO_BODY: {
            code: 5003,
            message: 'Review must have a body'
        },
        INVALID_RECOMMEND: {
            code: 5004,
            message: 'Invalid recommend value'
        },
        INVALID_ENJOY: {
            code: 5005,
            message: 'Invalid enjoy value'
        },
        NO_SESSION: {
            code: 5006,
            message: 'No session provided'
        }
    },
    COMMENT: {
        MISSING: {
            status: RESOURCE_NOT_FOUND,
            code: 6001,
            message: 'Comment doesn\'t exist'
        }
    },
    USER: {
        MISSING: {
            status: RESOURCE_NOT_FOUND,
            code: 7001,
            message: 'User doesn\'t exist'
        },
        NO_TOKEN: {
            status: UNAUTHENTICATED,
            code: 7002,
            message: 'Unauthenticated',
            headers: { 'WWW-Authenticate': 'Bearer' }
        },
        NO_PROFILE: {
            status: FORBIDDEN,
            code: 7003,
            message: 'No user profile'
        },
        EMAIL_NOT_VERIFIED: {
            status: FORBIDDEN,
            code: 7004,
            message: 'Email address not verified'
        },
        NO_NAME: {
            code: 7005,
            message: 'You must provide a display name'
        },
        NO_DEGREE: {
            code: 7006,
            message: 'You must provide a degree'
        },
        NO_GRAD_YEAR: {
            code: 7007,
            message: 'You must provide a graduation year'
        }
    },
    REPORT: {
        NO_REASON: {
            code: 8002,
            message: 'You must provide a reason'
        },
        ALREADY_REPORTED: {
            status: BAD_REQUEST,
            code: 8003,
            message: 'You\'ve already reported this post'
        }
    }
}

// map of code -> error object (for sql errors and might be useful elsewhere)
exports.ERROR_CODE_MAP = Object.values(exports.ERRORS)
    .reduce((obj, outer) => {
        Object.values(outer).map((err) => {
            obj[err.code] = err
        })
        return obj
    }, {})
