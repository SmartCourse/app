const uniModel = require('../models/uni')()
const courseModel = require('../models/course')()
const errorHandler = require('./error')
const { responseHandler } = require('../utils/helpers')

/* Get all subjects */
exports.getSubjects = function (_, res) {
    res.set({ 'Cache-Control': 'public, max-age=31557600' })
    responseHandler(uniModel.getSubjects(), res)
        .catch(errorHandler(res))
}

/* Get all degrees */
exports.getDegrees = function (_, res) {
    res.set({ 'Cache-Control': 'public, max-age=31557600' })
    responseHandler(uniModel.getDegrees(), res)
        .catch(errorHandler(res))
}

/* Get all faculties */
exports.getFaculties = function (_, res) {
    res.set({ 'Cache-Control': 'public, max-age=31557600' })
    responseHandler(uniModel.getFaculties(), res)
        .catch(errorHandler(res))
}

/* Get all courses of a given subject */
exports.getCourses = function ({ params }, res) {
    res.set({ 'Cache-Control': 'public, max-age=31557600' })
    responseHandler(courseModel.getCoursesBySubject(params.code), res)
        .catch(errorHandler(res))
}
