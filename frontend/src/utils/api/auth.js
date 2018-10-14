import { get, post, put } from '.'

/**
 * Add authtoken to request
 * @param {firebase.User} user A user auth object
 * https://firebase.google.com/docs/reference/js/firebase.User
 */
export function getAuthHeaders(user) {
  return user.getIdToken(/* forceRefresh true */)
    .then(token => ({
      headers: {
        'Authorization': `Bearer ${token}`
      },
      mode: 'cors'
    }))
}

/**
 * Get profile information not related to auth
 * from our server
 *
 * @param {firebase.User} user A user auth object
 */
export function getSelf(user) {
  return getAuthHeaders(user)
    .then(options => get('/user', options))
}

/**
 * first time sign up, need to create a new database
 * entry for the user
 * @param {*} user The user object provided by firebase
 */
export function createProfile(user, data) {
  return getAuthHeaders(user)
    .then(options => post('/user', { ...options, data }))
}

export function updateProfile(user, data) {
  return getAuthHeaders(user)
    .then(options => put('/user', { ...options, data }))
}

/**
 * Return public information for a user
 * @param {*} id The public user id
 */
export function getUser(id) {
  return get(`user/${id}`)
}
