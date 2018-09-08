import { get, post, put } from './index'
import format from 'date-fns/format'

/**
 * Get all reviews relevant to a course
 */
export function getReviews(course = 1) {
  return get(`/course/${course}/reviews`)
}

/* get review */
export function getReview(id) {
  return get(`/review/${id}`)
}

export function replyMapper({ replyID, likes, userID, body, timestamp }) {
  return {
    id: replyID,
    body,
    likes,
    author: userID,
    published: format(timestamp, 'DD/MM/YY')
  }
}

export function reviewMapper({ reviewID, likes, userID, title, body, timestamp }) {
  return {
    id: reviewID,
    title,
    body,
    likes,
    author: userID,
    published: format(timestamp, 'DD/MM/YY')
  }
}

// STUBS

/**
 * @param {object} body the data associated with the new review
 */
export function postQuestion(body) {
  return post('/review', { body })
}

export function getReplies(id) {
  return get(`/review/${id}/replies`)
}

/**
 * @param {String} id the id of the review being replied
 * @param {object} body the data associated with the new reply
 */
export function postReply(id, form) {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  return post(`/review/${id}/replies`, {headers, body: JSON.stringify(form)})
}

/**
 * @param {String} id the id of the review being edited
 * @param {object} body the data associated with the new review
 */
export function editReview(id, body) {
  return put(`/review/${id}`, { body })
}
