import { get, post } from '.'

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
    .then(options =>
      get('/user', options))
    .catch(err => console.warn(err))
}

/**
 * first time sign up, need to create a new database
 * entry for the user
 * @param {*} user The user object provided by firebase
 */
export function createUser(user) {
  return getAuthHeaders(user)
    .then(options => post('/user', options))
}

/**
 * Return public information for a user
 * @param {*} id The public user id
 */
export function getUser(id) {
  return get(`user/${id}`)
}
