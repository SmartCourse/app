const reportModel = require('../models/report')()
const { getResponseHandler, postResponseHandler, APIError } = require('../utils/helpers')
const { PERMISSIONS_MOD } = require('../models/constants')

/* POST new report. */
exports.postQuestionReport = function ({ user, params, query, body }, res, next) {
    body.userID = user.id
    // note that there's no actual endpoint for this yet
    const location = `/api/course/${params.code}/question/${params.id}/report`

    reportModel.postReport({ questionID: params.id }, body)
        .then(postResponseHandler(location, res))
        .catch(next)
}

/* GET question reports. */
exports.getQuestionReports = function ({ user, params, query }, res, next) {
    // TODO should we reveal that this endpoint exists?
    if (user.permissions < PERMISSIONS_MOD) {
        throw new APIError({ code: 1003, status: 403, message: 'Sorry, you can\'t view reports!' })
    }

    reportModel.getReports({ questionID: params.id })
        .then(res => res.map(({ id, reason, timestamp, reviewed, ...user }) => ({ id, reason, timestamp, reviewed, user })))
        .then(getResponseHandler(res))
        .catch(next)
}

/* GET a list of posts sorted by the number of reports on each. */
exports.getReports = function ({ user, query }, res, next) {
    // TODO should we reveal that this endpoint exists?
    if (user.permissions < PERMISSIONS_MOD) {
        throw new APIError({ code: 1003, status: 403, message: 'Sorry, you can\'t view reports!' })
    }

    reportModel.getAllReports(query.p)
        .then(getResponseHandler(res))
        .catch(next)
}
