const express = require('express')
const review = express.Router()
const reviewController = require('../controllers/review')

/* Get the review data for a specific review id */
review.get('/:id', reviewController.getReview)

/* Get page (N) answers for a review */
review.get('/:id/comments', reviewController.getReviewComments)

/* Post a comment for a given review */
review.post('/:id/comments', reviewController.postComment)

/* Get the like value */
review.get('/:id/likes', reviewController.getLikes)

/* Put an updated like value */
review.put('/:id/likes', reviewController.putLikes)

module.exports = review
