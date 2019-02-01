const express = require('express')
const review = express.Router({ mergeParams: true })
const reviewController = require('../controllers/review')
const commentController = require('../controllers/comment')
const reportController = require('../controllers/report')
const { isLoggedIn } = require('../utils/helpers')

/* Get the review data for a specific review id */
review.get('/:id', reviewController.getReview)

/* Get page (N) replies for a review */
review.get('/:id/comments', reviewController.getReviewComments)

/* Get the like value */
review.get('/:id/likes', reviewController.getReviewLikes)

/* Get the review's reply like value */
review.get('/:id/comment/:replyID/likes', reviewController.getReplyLikes)

/* Get an comment for a given review */
review.get('/:id/comment/:cid', commentController.getComment)

/* full auth check */
review.use(isLoggedIn)

/* Delete a review */
review.delete('/:id', reviewController.deleteReview)

/* Put an updated review */
review.put('/:id', reviewController.putReview)

/* Post a comment for a given review */
review.post('/:id/comment', reviewController.postComment)

/* Delete a comment */
review.delete('/:id/comment/:cid', commentController.deleteComment)

/* Put an updated comment */
review.put('/:id/comment/:cid', commentController.putComment)

/* Put an updated like value */
review.put('/:id/likes', reviewController.putReviewLikes)

/* Put an updated review's reply like value */
review.put('/:id/comment/:replyID/likes', reviewController.putReplyLikes)

/* Report a review */
review.post('/:id/report', reportController.postReport('review'))

/* Report a comment */
review.post('/:id/comment/:cid/report', reportController.postReport('comment'))

/* Get reports on a review */
review.get('/:id/reports', reportController.getReports('review'))

/* Get reports on an comment */
review.get('/:id/comment/:cid/reports', reportController.getReports('comment'))

module.exports = review
