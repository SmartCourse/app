import { get, post, put, remove } from './index'
import formatDistanceStrict from 'date-fns/formatDistanceStrict'

/* get review */
export function getReview(course, id) {
  return get(`/course/${course}/review/${id}`)
}

export function replyMapper({ id, timestamp, ...rest }) {
  return {
    id: String(id),
    published: formatDistanceStrict(new Date(timestamp), new Date(), { addSuffix: true }),
    timestamp: new Date(timestamp),
    ...rest
  }
}

export function reviewMapper({ id, numResponses, userLiked, recommend, timestamp, ...rest }) {
  return {
    id: String(id),
    userLiked,
    recommend: Boolean(recommend),
    numResponses,
    published: formatDistanceStrict(new Date(timestamp), new Date(), { addSuffix: true }),
    timestamp: new Date(timestamp),
    ...rest
  }
}

/* Maps a new review from a ReviewForm to something the backend understands */
export function newReviewMapper({ recommend, enjoy, difficulty, teaching, workload, ...rest }) {
  return {
    recommend: { 'Yes': 1, 'No': 0 }[recommend],
    enjoy: Number(enjoy),
    difficulty: { '': 0, 'Easy': 1, 'Average': 2, 'Hard': 3 }[difficulty],
    teaching: { '': 0, 'Poor': 1, 'Average': 2, 'Excellent': 3 }[teaching],
    workload: { '': 0, 'Light': 1, 'Average': 2, 'Heavy': 3 }[workload],
    ...rest
  }
}

/**
 * @param {object} data the data associated with the new review
 */
export function postReview(course, data) {
  return post(`/course/${course}/review`, { data })
}

/**
 * @param {string} course  the course code of the course
 * @param {string} id the id of the review being edited
 * @param {object} body the data associated with the new review
 */
export function editReview(course, id, data) {
  return put(`/course/${course}/review/${id}`, { data })
}

export function deleteReview(course, id) {
  return remove(`/course/${course}/review/${id}`)
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
  return post(`/course/${course}/review/${id}/comment`, { data })
    .then(cid => get(`/course/${course}/review/${id}/comment/${cid}`))
}

export function getLikes(course, id) {
  return get(`/course/${course}/review/${id}/likes`)
}

export function putLikes(course, id, data) {
  return put(`/course/${course}/review/${id}/likes`, { data })
}

export function getReplyLikes(course, id, commentID) {
  return get(`/course/${course}/review/${id}/comment/${commentID}/likes`)
}

export function putReplyLikes(course, id, commentID, data) {
  return put(`/course/${course}/review/${id}/comment/${commentID}/likes`, { data })
}

export function deleteReply(course, id, commentID) {
  return remove(`/course/${course}/review/${id}/comment/${commentID}`)
}

export function editReply(course, id, commentID, data) {
  return put(`/course/${course}/review/${id}/comment/${commentID}`, { data })
}
