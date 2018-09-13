const express = require('express')
const router = express.Router()
const reviewController = require('../controllers/review')

/* Get the review data for a specific review id */
router.get('/:id', reviewController.getReview)

/* Get page (N) answers for a question */
router.get('/:id/comments', reviewController.getReviewComments)

/* Post a comment for a given review */
router.post('/:id/comments', reviewController.postComment)

module.exports = router
