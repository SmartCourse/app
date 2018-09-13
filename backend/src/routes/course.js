const express = require('express')
const router = express.Router()
const courseController = require('../controllers/course')

/* Return all courses in the database */
router.get('/', courseController.getCourses)

/* Get the course data for a specific course id */
router.get('/:code', courseController.getCourse)

/* Get page (N) questions for a course */
router.get('/:code/questions', courseController.getCourseQuestions)

/* post a new question to a course page */
router.post('/:code/question', courseController.postQuestion)

/* Get page (N) reviews for a course */
router.get('/:code/reviews', courseController.getCourseReviews)

/* create a new review for course */
router.post('/:code/review', courseController.postReview)

module.exports = router
