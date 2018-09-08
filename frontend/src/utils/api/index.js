// TODO eventually second URL should be set to deploy url
const API_URL = process && process.env
  ? 'http://localhost:3000/api' : 'http://127.0.0.1:3000/api'

async function responseCheck(res) {
  if (res.ok) {
    return res.json()
  } else if (res.status >= 500) {
    const err = {code: res.status, message: 'Server Error'}
    throw err
  } else {
    const err = await res.json()
    throw err
  }
}

function request (path, { headers, method, data }) {
  // eventually add cors and auth headers

  const url = `${API_URL}${path}`

  if (method === 'GET') {
    return fetch(url)
  }

  headers = {
    'Content-Type': 'application/json',
    ...headers
  }

  const body = data ? JSON.stringify(data) : null

  return fetch(url, {
    headers,
    method,
    body
  })
}

/**
 * A GET request
 * @param   {string} path     The relative path for the api call.
 * @param   {object} options  Any options being passed to the req, eg. auth
 * @returns {Promise}         The relevant request
 */
export const get = (path, options) =>
  request(path, { ...options, method: 'GET' })
    .then(responseCheck)

/**
 * A POST request
 * @param   {string} path     The relative path for the api call.
 * @param   {object} options  Any options being passed to the req, eg. auth
 * @returns {Promise}         The relevant request
 */
export const post = (path, options) =>
  request(path, { ...options, method: 'POST' })
    .then(responseCheck)

/**
 * A PUT request
 * @param   {string} path     The relative path for the api call.
 * @param   {object} options  Any options being passed to the req, eg. auth
 * @returns {Promise}         The relevant request
 */
export const put = (path, options) =>
  request(path, { ...options, method: 'PUT' })
    .then(responseCheck)

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
