import APIError from './errors'
import store from '../../store'
import { getAuthHeaders } from './auth'

const API_URL = process.env.VUE_APP_API_URL

async function responseCheck(res) {
  if (res.ok) {
    // check if body, else rely on headers
    return res.status === 200 ? res.json() : res.headers.get('X-ID')
  } else if (res.status >= 500) {
    console.warn('APIError:', 'Server Error')
    throw new APIError('Server Error')
  } else {
    // if 400s response json is probably sent to explain problem
    const err = await res.json()
    console.warn('APIError:', err.message)
    throw new APIError(err.message, err.code, res.status)
  }
}

function request (path, { headers, method, data }) {
  // eventually add cors and auth headers
  const url = `${API_URL}${path}`
  const auth = store.getters['auth/userAuthObject']
  const body = data ? JSON.stringify(data) : null
  headers = {
    'Content-Type': 'application/json',
    ...headers
  }

  // creds always required for POST, PUT, DELETE
  // NB. for mvp allow people to slip through here
  // even if not logged on
  if (!headers.Authorization && auth) {
    return getAuthHeaders(auth)
      // simple request or non-simple?
      .then(options => method === 'GET' ? fetch(url, {
        headers: {
          ...options.headers
        }
      }) : fetch(url, {
        headers: {
          ...options.headers,
          ...headers
        },
        mode: options.mode,
        body,
        method
      }))
  }

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
 * A POST request, used to create an entry in the db
 * @param   {string} path     The relative path for the api call.
 * @param   {object} options  Any options being passed to the req, eg. auth
 * @returns {Promise}         The relevant request
 */
export const post = (path, options) =>
  request(path, { ...options, method: 'POST' })
    .then(responseCheck)

/**
 * A PUT request, used to update the db
 * @param   {string} path     The relative path for the api call.
 * @param   {object} options  Any options being passed to the req, eg. auth
 * @returns {Promise}         The relevant request
 */
export const put = (path, options) =>
  request(path, { ...options, method: 'PUT' })
    .then(responseCheck)

/**
 * A DELETE request, used to update the db
 * delete is a reserved word so we must call this function remove :(
 * @param   {string} path     The relative path for the api call.
 * @param   {object} options  Any options being passed to the req, eg. auth
 * @returns {Promise}         The relevant request
 */
export const remove = (path, options) =>
  request(path, { ...options, method: 'DELETE' })
    .then(responseCheck)

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
