const express = require('express')
const review = express.Router()
const reviewController = require('../controllers/review')

/* Get the review data for a specific review id */
review.get('/:id', reviewController.getReview)

/* Get page (N) replies for a review */
review.get('/:id/comments', reviewController.getReviewComments)

/* Post a comment for a given review */
review.post('/:id/comments', reviewController.postComment)

/* Get the like value */
review.get('/:id/likes', reviewController.getReviewLikes)

/* Put an updated like value */
review.put('/:id/likes', reviewController.putReviewLikes)

/* Get the review's reply like value */
review.get('/:id/reply/:replyID/likes', reviewController.getReplyLikes)

/* Put an updated review's reply like value */
review.put('/:id/reply/:replyID/likes', reviewController.putReplyLikes)

module.exports = review
