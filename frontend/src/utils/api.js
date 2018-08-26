
const API_URL = 'http://localhost:3000/api'

const get = (url, options = {}) =>
  fetch(url, options)
    .then(res => res.json())

const post = (url, options = {}) =>
  fetch(url, { ...options, method: 'POST' })
    .then(res => res.json())

const put = (url, options = {}) =>
  fetch(url, { ...options, method: 'PUT' })
    .then(res => res.json())

export const delay = (ms) => fn => setTimeout(fn, ms)

/* get questions */
export function getQuestions () {
  return get(`${API_URL}/_questions`)
}

/* get question */
export function getQuestion (id) {
  return get(`${API_URL}/questions/${id}.json`)
}

// STUBS

/**
 * @param {object} body the data associated with the new question
 */
export function postQuestion (body) {
  return post(`${API_URL}/question`, { body })
}

/**
 * @param {object} body the data associated with the new question
 */
export function editQuestion (id, body) {
  return put(`${API_URL}/question/${id}`, { body })
}
