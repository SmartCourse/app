import { get, post } from '.'

/**
 * Get profile information not related to auth
 * from our server
 * https://firebase.google.com/docs/reference/js/firebase.User
 * @param {firebase.User} user A user auth object
 */
export function getSelf(user) {
  return user.getIdToken(/* forceRefresh true */)
    .then(idToken =>
      get('/user', {
        headers: {
          'Authorization': `Bearer ${idToken}`
        },
        mode: 'cors'
      })).catch(err => console.warn(err))
}

/**
 * first time sign up, need to create a new database
 * entry for the user
 * @param {*} user The user object provided by firebase
 */
export function createUser(user) {
  return post('/user', {
    data: user
  })
}

/**
 * Return public information for a user
 * @param {*} id The public user id
 */
export function getUser(id) {
  return get(`user/${id}`)
}
