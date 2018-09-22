const courseModel = require('../models/subject')()
const subjectModel = require('../models/course')()
const errorHandler = require('./error')
const { responseHandler } = require('../utils/helpers')

/* Get all subjects */
exports.getSubjects = function (_, res) {
    responseHandler(subjectModel.getSubjects(), res)
        .catch(errorHandler(res))
}

/* Get all courses of a given subject */
exports.getCourses = function ({ params }, res) {
    responseHandler(courseModel.getCourses(params.code), res)
        .catch(errorHandler(res))
}

