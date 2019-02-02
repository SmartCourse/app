const reportModel = require('../models/report')()
const { getResponseHandler, postResponseHandler } = require('../utils/helpers')
const { APIError, ERRORS } = require('../utils//error')
const { PERMISSIONS_MOD } = require('../models/constants')

/* return function for POSTing new report. */
exports.postReport = function (type) {
    // note that there's no actual endpoint for this yet
    const topType = type === 'answer' || type === 'question' ? 'question' : 'review'

    return function ({ user, params, body }, res, next) {
        body.userID = user.id

        let location
        if (type === 'answer' || type === 'comment') {
            location = `/api/course/${params.code}/${topType}/${params.id}/${type}/${params.cid}/report`
        } else {
            location = `/api/course/${params.code}/${topType}/${params.id}/report`
        }

        // reports always have a questionID or reviewID, and have a commentID if the reported post is a comment
        reportModel.postReport({
            [`${topType}ID`]: params.id,
            commentID: params.cid ? params.cid : null
        }, params.code, body)
            .then(postResponseHandler(location, res))
            .catch(next)
    }
}

/* GET reports for a given post. */
exports.getReports = function (type) {
    // change answer to comment
    type = type === 'answer' ? 'comment' : type

    return function ({ user, params }, res, next) {
        // TODO should we reveal that this endpoint exists?
        if (user.permissions < PERMISSIONS_MOD) {
            throw new APIError(ERRORS.MISC.AUTHORIZATION)
        }

        // only need one id for retrieval
        reportModel.getReports({
            [`${type}ID`]: params.id
        })
            .then(reports => reports.map(({ id, reason, timestamp, reviewed, ...user }) => ({ id, reason, timestamp, reviewed, user })))
            .then(getResponseHandler(res))
            .catch(next)
    }
}

/* GET a list of posts sorted by the number of reports on each. */
exports.getReportSummary = function ({ user, query }, res, next) {
    // TODO should we reveal that this endpoint exists?
    if (user.permissions < PERMISSIONS_MOD) {
        throw new APIError(ERRORS.MISC.AUTHORIZATION)
    }

    reportModel.getReportSummary(query.p)
        .then(getResponseHandler(res))
        .catch(next)
}
