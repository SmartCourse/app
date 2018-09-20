import APIError from './errors'
// TODO - THIS DOESN'T SEEM TO BE WORKING...
export const API_URL = process && process.env
  ? 'https://smartcourse-test.azurewebsites.net/api' : 'https://smartcourse-test.azurewebsites.net/api'

async function responseCheck(res) {
  if (res.ok) {
    return res.json()
  } else if (res.status >= 500) {
    throw new APIError('Server Error')
  } else {
    const err = await res.json()
    throw new APIError(err.message, err.code)
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
