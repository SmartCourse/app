import { get, post, put } from './index'
import format from 'date-fns/format'

/* get review */
export function getReview(course, id) {
  return get(`/course/${course}/review/${id}`)
}

export function replyMapper({ id, likes, userID, body, timestamp }) {
  return {
    id: String(id),
    body,
    likes,
    author: userID,
    published: format(timestamp, 'DD/MM/YY')
  }
}

export function reviewMapper({ id, code, likes, userID, title, body, timestamp }) {
  return {
    id: String(id),
    code,
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
export function postReview(course, data) {
  return post(`/course/${course}/review`, { data })
}

export function getReplies(course, id) {
  return get(`/course/${course}/review/${id}/comments`)
}

/**
 * @param {string} course  the course code of the course
 * @param {string} id the id of the review being replied
 * @param {object} body the data associated with the new reply
 */
export function postReply(course, id, data) {
  return post(`/course/${course}/review/${id}/comments`, { data })
}

/**
 * @param {string} course  the course code of the course
 * @param {string} id the id of the review being edited
 * @param {object} body the data associated with the new review
 */
export function editReview(course, id, data) {
  return put(`/course/${course}/review/${id}`, { data })
}
