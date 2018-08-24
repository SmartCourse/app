
const API_URL = ''

const getJSON = (url, options = {}) =>
  fetch(url, options)
    .then(res => res.json())

export const delay = (ms) => fn => setTimeout(fn, ms)

/* get questions */
export function getQuestions () {
  return getJSON(`${API_URL}/posts.json`)
}

/* get question */
export function getQuestion (id) {
  return getJSON(`${API_URL}/questions/${id}.json`)
}
