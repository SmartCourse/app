const uniModel = require('../models/uni')()
const courseModel = require('../models/course')()
const { getResponseHandler } = require('../utils/helpers')

/* Get all subjects */
exports.getSubjects = function (_, res, next) {
    uniModel.getSubjects()
        .then(getResponseHandler(res))
        .catch(next)
}

/* Get all degrees */
exports.getDegrees = function (_, res, next) {
    uniModel.getDegrees()
        .then(getResponseHandler(res))
        .catch(next)
}

/* Get all faculties */
exports.getFaculties = function (_, res, next) {
    uniModel.getFaculties()
        .then(getResponseHandler(res))
        .catch(next)
}

/* Get all courses of a given subject */
exports.getCourses = function ({ params }, res, next) {
    courseModel.getCoursesBySubject(params.code)
        .then(getResponseHandler(res))
        .catch(next)
}

exports.getSessions = function (_, res, next) {
    uniModel.getSessions()
        .then(getResponseHandler(res))
        .catch(next)
}
