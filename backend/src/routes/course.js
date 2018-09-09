const express = require('express')
const router = express.Router()
const courseController = require('../controllers/course')

/* Return all courses in the database */
router.get('/', courseController.getCourses)

/* Get the course data for a specific course id */
router.get('/:id', courseController.getCourse)

/* Get page (N) questions for a course */
router.get('/:id/questions', courseController.getCourseQuestions)

/* post a new question to a course page */
router.post('/:id/question', courseController.postQuestion)

/* Get page (N) reviews for a course */
router.get('/:id/reviews', courseController.getCourseReviews)

/* create a new review for course */
router.post('/:id/review', courseController.postReview)

module.exports = router
