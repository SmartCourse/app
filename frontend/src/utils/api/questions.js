import { get, post, put } from './index'
import format from 'date-fns/format'

/* get question */
export function getQuestion(course, id) {
  return get(`/course/${course}/question/${id}`)
}

export function answerMapper({ id, questionID, likes, userID, body, timestamp }) {
  return {
    id: String(id),
    questionID: String(questionID),
    body,
    likes,
    author: userID,
    published: format(timestamp, 'DD/MM/YY')
  }
}

export function questionMapper({ id, code, likes, userLiked, userID, title, body, timestamp }) {
  return {
    id: String(id),
    code,
    title,
    body,
    likes,
    userLiked,
    author: userID,
    published: format(timestamp, 'DD/MM/YY')
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
  return post(`/course/${course}/question/${id}/answers`, { data })
}

export function getLikes(course, id) {
  return get(`/course/${course}/question/${id}/likes`)
}

export function putLikes(course, id, data) {
  return put(`/course/${course}/question/${id}/likes`, { data })
}

export function getAnswerLikes(course, id, commentID) {
  return get(`/course/${course}/question/${id}/amswer/${commentID}/likes`)
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
  return put(`/course/${course}/question/${id}/`, { data })
}
