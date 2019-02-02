const express = require('express')
const course = express.Router()
const courseController = require('../controllers/course')
const questionRouter = require('./question')
const reviewRouter = require('./review')

/** child routes */
course.use('/:code/review', reviewRouter)
course.use('/:code/question', questionRouter)

/* Return all courses in the database */
course.get('/', courseController.getCourses)

/* Get the course data for a specific course id */
course.get('/:code', courseController.getCourse)

/* Get page (N) questions for a course */
course.get('/:code/questions', courseController.getCourseQuestions)

/* Get page (N) reviews for a course */
course.get('/:code/reviews', courseController.getCourseReviews)

module.exports = course
