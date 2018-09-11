import { get, post, put } from './index'
import format from 'date-fns/format'

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

/**
 * @param {object} data the data associated with the new review
 */
export function postReview(id, data) {
  return post(`/course/${id}/review`, { data })
}

export function getReplies(id) {
  return get(`/review/${id}/replies`)
}

/**
 * @param {string} id the id of the review being replied
 * @param {object} body the data associated with the new reply
 */
export function postReply(id, data) {
  return post(`/review/${id}/replies`, { data })
}

/**
 * @param {string} id the id of the review being edited
 * @param {object} body the data associated with the new review
 */
export function editReview(id, data) {
  return put(`/review/${id}`, { data })
}
