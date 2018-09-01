import { get, post, put } from './index'
import format from 'date-fns/format'

/**
 * Get all questions relevant to a course
 */
export function getQuestions() {
  return get('/course/1/questions')
}

/* get question */
export function getQuestion(id) {
  return get(`/question/${id}`)
}

export function answerMapper({ answerID, userID, title, body }) {
  return {
    id: answerID,
    body,
    author: userID,
    published: format(Date.now(), 'DD/MM/YY')
  }
}

export function questionMapper({ questionID, userID, title, body }) {
  return {
    id: questionID,
    title,
    body,
    author: userID,
    published: format(Date.now(), 'DD/MM/YY')
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
 * @param {object} body the data associated with the new answer {title, body}
 */
export function postAnswer(id, body) {
  return post(`/question/${id}`, { body })
}

/**
 * @param {String} id the id of the question being edited
 * @param {object} body the data associated with the new question
 */
export function editQuestion(id, body) {
  return put(`/question/${id}`, { body })
}
