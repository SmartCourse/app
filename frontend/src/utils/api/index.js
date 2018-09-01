
const API_URL = process && process.env ? 'http://localhost:3000/api' : 'data'

/**
 * A GET request
 * @param {string} path      The relative path for the api call.
 * @param {object} options  Any options being passed to the req, eg. auth
 * @returns {Promise}       The relevant request
 */
export const get = (path, options = {}) =>
  fetch(`${API_URL}${path}`, {...options})
    .then(res => res.json())

/**
 * A POST request
 * @param {string} path      The relative path for the api call.
 * @param {object} options  Any options being passed to the req, eg. auth
 * @returns {Promise}       The relevant request
 */
export const post = (path, options = {}) =>
  fetch(`${API_URL}${path}`, { ...options, method: 'POST' })
    .then(res => res.json())

/**
 * A PUT request
 * @param {string} path      The relative path for the api call.
 * @param {object} options  Any options being passed to the req, eg. auth
 * @returns {Promise}       The relevant request
 */
export const put = (path, options = {}) =>
  fetch(`${API_URL}${path}`, { ...options, method: 'PUT' })
    .then(res => res.json())

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
