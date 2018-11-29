import { get, post, put } from './index'
import formatDistanceStrict from 'date-fns/formatDistanceStrict'

/* get question */
export function getQuestion(course, id) {
  return get(`/course/${course}/question/${id}`)
}

export function answerMapper({ id, questionID, likes, user, userLiked, body, timestamp }) {
  return {
    id: String(id),
    questionID: String(questionID),
    body,
    likes,
    userLiked,
    user,
    published: formatDistanceStrict(timestamp * 1000, new Date(), { addSuffix: true }),
    timestamp: timestamp
  }
}

export function questionMapper({ id, code, likes, userLiked, numAnswers, user, title, body, timestamp }) {
  return {
    id: String(id),
    code,
    title,
    body,
    numAnswers,
    likes,
    userLiked,
    user,
    published: formatDistanceStrict(timestamp * 1000, new Date(), { addSuffix: true }),
    timestamp: timestamp
  }
}

/**
 * @param {object} data the data associated with the new question
 */
export function postQuestion(course, data) {
  return post(`/course/${course}/question`, { data })
}

export function getAnswers(course, id) {
  return get(`/course/${course}/question/${id}/answers`)
}

/**
 * @param {string} course  the course code of the course
 * @param {string} id      the id of the question being answered
 * @param {object} data    the data associated with the new answer
 */
export function postAnswer(course, id, data) {
  return post(`/course/${course}/question/${id}/answer`, { data })
    .then(cid => get(`/course/${course}/question/${id}/answer/${cid}`))
}

export function getLikes(course, id) {
  return get(`/course/${course}/question/${id}/likes`)
}

export function putLikes(course, id, data) {
  return put(`/course/${course}/question/${id}/likes`, { data })
}

export function getAnswerLikes(course, id, commentID) {
  return get(`/course/${course}/question/${id}/answer/${commentID}/likes`)
}

export function putAnswerLikes(course, id, commentID, data) {
  return put(`/course/${course}/question/${id}/answer/${commentID}/likes`, { data })
}

/**
 * @param {string} course  the course code of the course
 * @param {string} id      the id of the question being edited
 * @param {object} data    the data associated with the new question
 */
export function editQuestion(course, id, data) {
  return put(`/course/${course}/question/${id}`, { data })
}
