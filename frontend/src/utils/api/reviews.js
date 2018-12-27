import { get, post, put } from './index'
import formatDistanceStrict from 'date-fns/formatDistanceStrict'

/* get review */
export function getReview(course, id) {
  return get(`/course/${course}/review/${id}`)
}

export function replyMapper({ id, likes, userLiked, user, body, timestamp }) {
  return {
    id: String(id),
    body,
    likes,
    userLiked,
    user,
    published: formatDistanceStrict(new Date(timestamp), new Date(), { addSuffix: true }),
    timestamp: new Date(timestamp)
  }
}

export function reviewMapper({ id, code, title, body, likes, numResponses, userLiked, recommend, user, timestamp }) {
  return {
    id: String(id),
    code,
    title,
    body,
    likes,
    userLiked,
    recommend: Boolean(recommend),
    numResponses,
    user,
    published: formatDistanceStrict(new Date(timestamp), new Date(), { addSuffix: true }),
    timestamp: new Date(timestamp)
  }
}

/* Maps a new review from a ReviewForm to something the backend understands */
export function newReviewMapper({ title, body, recommend, enjoy, difficulty, teaching, workload }) {
  return {
    title,
    body,
    recommend: { 'Yes': 1, 'No': 0 }[recommend],
    enjoy: Number(enjoy),
    difficulty: { '': 0, 'Easy': 1, 'Average': 2, 'Hard': 3 }[difficulty],
    teaching: { '': 0, 'Poor': 1, 'Average': 2, 'Excellent': 3 }[teaching],
    workload: { '': 0, 'Light': 1, 'Average': 2, 'Heavy': 3 }[workload]
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
  return post(`/course/${course}/review/${id}/comment`, { data })
    .then(cid => get(`/course/${course}/review/${id}/comment/${cid}`))
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
  return get(`/course/${course}/review/${id}/comment/${commentID}/likes`)
}

export function putReplyLikes(course, id, commentID, data) {
  return put(`/course/${course}/review/${id}/comment/${commentID}/likes`, { data })
}
