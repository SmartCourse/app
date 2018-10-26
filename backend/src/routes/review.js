const express = require('express')
const review = express.Router()
const reviewController = require('../controllers/review')
const { isLoggedIn } = require('../utils/helpers')

/* Get the review data for a specific review id */
review.get('/:id', reviewController.getReview)

/* Get page (N) replies for a review */
review.get('/:id/comments', reviewController.getReviewComments)

/* Get the like value */
review.get('/:id/likes', reviewController.getReviewLikes)

/* Get the review's reply like value */
review.get('/:id/reply/:replyID/likes', reviewController.getReplyLikes)

/* full auth check */
review.use(isLoggedIn)

/* Post a comment for a given review */
review.post('/:id/comments', reviewController.postComment)

/* Put an updated like value */
review.put('/:id/likes', reviewController.putReviewLikes)

/* Put an updated review's reply like value */
review.put('/:id/reply/:replyID/likes', reviewController.putReplyLikes)

module.exports = review
