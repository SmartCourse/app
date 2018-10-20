const uniModel = require('../models/uni')()
const courseModel = require('../models/course')()
const errorHandler = require('./error')
const { responseHandler } = require('../utils/helpers')

/* Get all subjects */
exports.getSubjects = function (_, res) {
    responseHandler(uniModel.getSubjects(), res)
        .catch(errorHandler(res))
}

/* Get all degrees */
exports.getDegrees = function (_, res) {
    responseHandler(uniModel.getDegrees(), res)
        .catch(errorHandler(res))
}

/* Get all faculties */
exports.getFaculties = function (_, res) {
    responseHandler(uniModel.getFaculties(), res)
        .catch(errorHandler(res))
}

/* Get all courses of a given subject */
exports.getCourses = function ({ params }, res) {
    responseHandler(courseModel.getCoursesBySubject(params.code), res)
        .catch(errorHandler(res))
}
