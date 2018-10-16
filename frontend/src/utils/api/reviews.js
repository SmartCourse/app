import { get, post, put } from './index'
import { formatDistanceStrict } from 'date-fns'

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
    published: formatDistanceStrict(new Date(timestamp + 'Z'), new Date(), { addSuffix: true })
  }
}

export function reviewMapper({ id, code, title, body, likes, recommend, userID, timestamp }) {
  return {
    id: String(id),
    code,
    title,
    body,
    likes,
    recommend,
    author: userID,
    published: formatDistanceStrict(new Date(timestamp + 'Z'), new Date(), { addSuffix: true })
  }
}

/* Maps a new review from a ReviewForm to something the backend understands */
export function newReviewMapper({ title, body, recommend, enjoy, difficulty, teaching, workload }) {
  return {
    title,
    body,
    recommend: {'Yes': 1, 'No': 0}[recommend],
    enjoy: Number(enjoy),
    difficulty: {'': 0, 'Easy': 1, 'Average': 2, 'Hard': 3}[difficulty],
    teaching: {'': 0, 'Poor': 1, 'Average': 2, 'Excellent': 3}[teaching],
    workload: {'': 0, 'Light': 1, 'Average': 2, 'Heavy': 3}[workload]
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

export function getLikes(course, id) {
  return get(`/course/${course}/review/${id}/likes`)
}

export function putLikes(course, id, data) {
  return put(`/course/${course}/review/${id}/likes`, { data })
}

export function getReplyLikes(course, id, commentID) {
  return get(`/course/${course}/review/${id}/reply/${commentID}/likes`)
}

export function putReplyLikes(course, id, commentID, data) {
  return put(`/course/${course}/review/${id}/reply/${commentID}/likes`, { data })
}
