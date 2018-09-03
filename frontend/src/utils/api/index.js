// TODO eventually second URL should be set to deploy url
const API_URL = process && process.env
  ? 'http://localhost:3000/api' : 'http://127.0.0.1:3000/api'

async function responseCheck(res) {
    if (res.ok) {
        return res.json()
    } else if (res.status >= 500) {
        throw {code:res.status, message:"Server Error"}
    } else {
        const message = await res.json()
        throw message
    }
}

/**
 * A GET request
 * @param {string} path      The relative path for the api call.
 * @param {object} options  Any options being passed to the req, eg. auth
 * @returns {Promise}       The relevant request
 */
export const get = (path, options = {}) =>
  fetch(`${API_URL}${path}`, options)
    .then(responseCheck)

/**
 * A POST request
 * @param {string} path      The relative path for the api call.
 * @param {object} options  Any options being passed to the req, eg. auth
 * @returns {Promise}       The relevant request
 */
export const post = (path, options = {}) =>
  fetch(`${API_URL}${path}`, { ...options, method: 'POST' })
    .then(responseCheck)

/**
 * A PUT request
 * @param {string} path      The relative path for the api call.
 * @param {object} options  Any options being passed to the req, eg. auth
 * @returns {Promise}       The relevant request
 */
export const put = (path, options = {}) =>
  fetch(`${API_URL}${path}`, { ...options, method: 'PUT' })
    .then(responseCheck)

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
