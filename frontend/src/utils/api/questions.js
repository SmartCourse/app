import { get, post, put } from './index'

/**
 * Get all questions relevant to a course
 */
export function getQuestions () {
  return get('/course/1/questions')
}

/* get question */
export function getQuestion (id) {
  return get(`/question/${id}`)
}

// STUBS

/**
 * @param {object} body the data associated with the new question
 */
export function postQuestion (body) {
  return post('/question', { body })
}

/**
 * @param {String} id the id of the question being answered
 * @param {object} body the data associated with the new answer {title, body}
 */
export function postAnswer (id, body) {
  return post(`/question/${id}`, { body })
}

/**
 * @param {String} id the id of the question being edited
 * @param {object} body the data associated with the new question
 */
export function editQuestion (id, body) {
  return put(`/question/${id}`, { body })
}
