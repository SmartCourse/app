import { get, post, put } from './index'
import format from 'date-fns/format'

/**
 * Get all questions relevant to a course
 */
export function getQuestions(course = 1) {
  return get(`/course/${course}/questions`)
}

/* get question */
export function getQuestion(id) {
  return get(`/question/${id}`)
}

export function answerMapper({ answerID, likes, userID, body, timestamp }) {
  return {
    id: answerID,
    body,
    likes,
    author: userID,
    published: format(timestamp, 'DD/MM/YY')
  }
}

export function questionMapper({ questionID, likes, userID, title, body, timestamp }) {
  return {
    id: questionID,
    title,
    body,
    likes,
    author: userID,
    published: format(timestamp, 'DD/MM/YY')
  }
}

// STUBS

/**
 * @param {object} body the data associated with the new question
 */
export function postQuestion(body) {
  return post('/question', { body })
}

export function getAnswers(id) {
  return get(`/question/${id}/answers`)
}

/**
 * @param {String} id the id of the question being answered
 * @param {object} body the data associated with the new answer
 */
export function postAnswer(id, form) {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  return post(`/question/${id}/answers`, {headers, body: JSON.stringify(form)})
}

/**
 * @param {String} id the id of the question being edited
 * @param {object} body the data associated with the new question
 */
export function editQuestion(id, body) {
  return put(`/question/${id}`, { body })
}
