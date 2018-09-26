const subjectModel = require('../models/subject')()
const courseModel = require('../models/course')()
const errorHandler = require('./error')
const { responseHandler } = require('../utils/helpers')

/* Get all subjects */
exports.getSubjects = function (_, res) {
    responseHandler(subjectModel.getSubjects(), res)
        .catch(errorHandler(res))
}

/* Get all courses of a given subject */
exports.getCourses = function ({ params }, res) {
    responseHandler(courseModel.getCoursesBySubject(params.code), res)
        .catch(errorHandler(res))
}
