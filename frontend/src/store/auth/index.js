// firebase authentication class
import auth from './config'
import CV from './CV'

import { createProfile, updateProfile, getSelf } from '@/utils/api/auth'

// TODO: more idiomatic way to do this? Router something?
const _baseURL = `${window.location.protocol}//${window.location.host}`
const _continueVerifyURL = `${_baseURL}/create-profile`
const _continueResetURL = `${_baseURL}/login`

const state = {
  loading: false,
  error: '',
  // firebase authObject
  userAuthObject: null,
  // our own user data
  profile: null,
  // condition variable for app to wait on while waiting for auth to resolve on boot
  authCV: new CV()
}

const getters = {
// logged into firebase (authenticated account)
  isFirebaseAuthorised: ({ userAuthObject }) => !!userAuthObject,

  emailVerified: ({ userAuthObject }) => !!userAuthObject && userAuthObject.emailVerified,
  // TODO not sure if this is useful...
  hasProfile: ({ profile }) => !!profile,
  // logged into backend (existing profile) and authed with firebase with a verified email address
  isLoggedIn: ({ profile, userAuthObject }) => !!profile && !!userAuthObject && userAuthObject.emailVerified,

  profile: ({ profile }) => profile,
  userAuthObject: ({ userAuthObject }) => userAuthObject,
  loading: ({ loading }) => loading,
  error: ({ error }) => error,
  authCV: ({ authCV }) => authCV
}

const mutations = {
  ERROR(state, message) {
    if (message) console.warn('AUTH ERROR', message)
    state.error = message
  },
  SET_LOADING(state, isLoading) {
    state.loading = isLoading
  },
  /**
   * @param {*} state The root state
   * @param {*} user  The logged in user object or null
   */
  SET_USER(state, user) {
    state.userAuthObject = user
  },
  /**
   * @param {*} state The root state
   * @param {*} profile The user's profile object
   */
  SET_PROFILE(state, profile) {
    // anytime we want to set the profile, we want to update the local storage too
    /*
    if (profile) {
      localStorage.setItem('PROFILE_KEY', JSON.stringify(profile))
    } else {
      localStorage.removeItem('PROFILE_KEY')
    }
    */
    state.profile = profile
  },
  SIGNAL_AUTH_CV(state) {
    state.authCV.signal()
  }
}

const actions = {

  async signIn({ commit, dispatch, state }, { email, password }) {
    commit('SET_LOADING', true)
    try {
      /* successful signIn returns an UserCredential object which has field user */
      const { user } = await auth.signInWithEmailAndPassword(email, password)
      commit('SET_USER', user)
    } catch (error) {
      commit('ERROR', error.message)
    }

    // no firebase auth, just get outta here
    if (!state.userAuthObject) {
      commit('SET_LOADING', false)
      return
    }

    await dispatch('getProfile')
    commit('SET_LOADING', false)
  },

  /**
   * logout client side. Everything will be handled by
   * firebase for this.
   */
  logout({ commit }) {
    commit('SET_LOADING', true)
    return auth.signOut()
      .then(() => {
        commit('SET_USER', null)
        commit('SET_PROFILE', null)
      })
      .finally(() => commit('SET_LOADING', false))
  },

  sendEmailVerification({ commit, state }) {
    commit('SET_LOADING', true)
    return state.userAuthObject.sendEmailVerification({ url: _continueVerifyURL })
      .catch(error => commit('ERROR', error.message))
      .then(() => commit('ERROR', 'Verification email re-sent'))
      .finally(() => commit('SET_LOADING', false))
  },

  /**
   * successful signup returns an UserAuth object.
   * UserAuth obj has field user which is what we're interested in
   * Currently, successful signUp will automatically sign in user.
   **/
  createAccount({ commit }, { email, password }) {
    commit('SET_LOADING', true)
    return auth.createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        commit('SET_USER', user)
        return user.sendEmailVerification({ url: _continueVerifyURL })
      })
      .catch(error => commit('ERROR', error.message))
      .finally(() => commit('SET_LOADING', false))
  },

  /**
  * Create user profile in the backend
  * Assume existing user
  */
  createProfile({ commit, state }, { displayName, gradYear, degree }) {
    commit('SET_LOADING', true)
    // reload user in case of stale emailVerified
    return state.userAuthObject.reload()
      // we need a new token to actually ensure the token's email_verified is up to date
      .then(() => state.userAuthObject.getIdToken(true))
      .then(() => createProfile(state.userAuthObject, { displayName, gradYear, degree }))
      .then((profile) => commit('SET_PROFILE', profile))
      .catch(error => commit('ERROR', error.message))
      .finally(() => commit('SET_LOADING', false))
  },

  /**
  * Update user profile
  * Assume existing user
  **/
  updateProfile({ commit }, { data }) {
    commit('SET_LOADING', true)
    return updateProfile(state.userAuthObject, data)
      .then((profile) => commit('SET_PROFILE', profile))
      .catch(error => commit('ERROR', error.message))
      .finally(() => commit('SET_LOADING', false))
  },

  /*
  * Get profile from backend and put it in the store.
  * Assumes valid firebase token in the store
  */
  async getProfile({ commit, state }) {
    const oldLoading = state.loading
    commit('SET_LOADING', true)

    try {
      const profile = await getSelf(state.userAuthObject)
      // success!
      commit('SET_PROFILE', profile)
    } catch (error) {
      // abort! abort!
      commit('ERROR', error.message)
      commit('SET_PROFILE', null)
      // if there's a 7003 or 7004 error code, it means it's a valid account but either email isn't verified or no profile exists yet
      if (error.code && (error.code === 7003 || error.code === 7004)) {
        return
      }
      // otherwise, completely abort auth
      commit('SET_USER', null)
      await auth.signOut()
    } finally {
      // restore loading state
      commit('SET_LOADING', oldLoading)
    }
  },

  /**
   * Called on application boot once firebase has been initialised
   * Logs into firebase and retrieves the profile
   * If anything fails it clears everything
   */
  async checkAuth({ commit, dispatch, state }) {
    commit('SET_LOADING', true)
    try {
      // returns user object
      const user = await new Promise((resolve, reject) => {
        // add a handler for change in signin state
        const unsubscribe = auth.onAuthStateChanged(user => {
          // unsubscribe this function, so it no longer handles the state change
          unsubscribe()
          // return the user auth object, or null if not authorized
          resolve(user)
        }, reject)
      })
      // reload it to get the freshest emailVerified state
      await user.reload()
      // we need a new token to actually ensure the token's email_verified is up to date
      await user.getIdToken(true)

      // put it in the store
      commit('SET_USER', user)
    } catch (error) {
      commit('ERROR', error.message)
    }

    if (state.userAuthObject) {
      // Now try to get the profile
      await dispatch('getProfile')
    }

    // get existing profile information if cached
    /*
    const existing = localStorage.getItem('PROFILE_KEY')
    if (existing) {
      const parsed = JSON.parse(existing)
      // existing profile data means the user didn't log out
      commit('SET_PROFILE', parsed)
      commit('SET_LOADING', false)
      return
    }
    */

    // signal the CV so the app can continue loading and use the JWT token in its requests
    // Note we _need_ to do this before returning!
    commit('SIGNAL_AUTH_CV')

    commit('SET_LOADING', false)
  },

  /**
   * simply send a password reset email... no need to be authorised or anything
   */
  sendPasswordResetEmail({ commit }, { email }) {
    commit('SET_LOADING', true)
    return auth.sendPasswordResetEmail(email, { url: _continueResetURL })
      .catch(error => commit('ERROR', error.message))
      .finally(() => commit('SET_LOADING', false))
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
