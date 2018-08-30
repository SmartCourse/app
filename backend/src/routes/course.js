const express = require('express')
const router = express.Router()
const courseController = require('../controllers/course')

/* Get the course data for a specific course id */
router.get('/:id', courseController.getCourse)

/* Get page (N) questions for a course */
router.get('/:id/questions', courseController.getCourseQuestions)

/* Get page (N) reviews for a course */
router.get('/:id/reviews', courseController.getCourseReviews)

module.exports = router
