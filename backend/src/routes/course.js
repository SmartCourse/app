const express = require('express')
const router = express.Router({mergeParams: true})
const courseController = require('../controllers/course')

const questionRouter = require('./question')
const reviewRouter = require('./review')

/* Get specific question for a course */
router.use('/question', questionRouter)
/* Get specific review for a course */
router.use('/review', reviewRouter)


/* Get the course data for a specific course id */
router.get('/', courseController.getCourse)

/* Get page (N) questions for a course */
router.get('/questions', courseController.getCourseQuestions)

/* Get page (N) reviews for a course */
router.get('/reviews', courseController.getCourseReviews)


module.exports = router