import { get, post, put, remove } from './index'
import formatDistanceStrict from 'date-fns/formatDistanceStrict'

/* get question */
export function getQuestion(course, id) {
  return get(`/course/${course}/question/${id}`)
}

export function answerMapper({ id, questionID, timestamp, ...rest }) {
  return {
    id: String(id),
    questionID: String(questionID),
    published: formatDistanceStrict(new Date(timestamp), new Date(), { addSuffix: true }),
    timestamp: new Date(timestamp),
    ...rest
  }
}

export function questionMapper({ id, numAnswers: numResponses, timestamp, ...rest }) {
  return {
    id: String(id),
    numResponses,
    published: formatDistanceStrict(new Date(timestamp), new Date(), { addSuffix: true }),
    timestamp: new Date(timestamp),
    ...rest
  }
}

/**
 * @param {object} data the data associated with the new question
 */
export function postQuestion(course, data) {
  return post(`/course/${course}/question`, { data })
}

/**
 * @param {string} course  the course code of the course
 * @param {string} id      the id of the question being edited
 * @param {object} data    the data associated with the new question
 */
export function editQuestion(course, id, data) {
  return put(`/course/${course}/question/${id}`, { data })
}

export function reportQuestion(course, id, data) {
  return post(`/course/${course}/question/${id}/report`, { data })
}

export function deleteQuestion(course, id) {
  return remove(`/course/${course}/question/${id}`)
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

export function deleteAnswer(course, id, commentID) {
  return remove(`/course/${course}/question/${id}/answer/${commentID}`)
    // return id so it can be removed from the list of answers
    .then(() => commentID)
}

export function editAnswer(course, id, commentID, data) {
  return put(`/course/${course}/question/${id}/answer/${commentID}`, { data })
}

export function reportAnswer(course, id, commentID, data) {
  return post(`/course/${course}/question/${id}/answer/${commentID}/report`, { data })
}
