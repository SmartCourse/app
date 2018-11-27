// firebase authentication class
import auth from './config'

import { createProfile, updateProfile, getSelf } from '@/utils/api/auth'

const state = {
  loading: false,
  error: '',
  // firebase authObject
  userAuthObject: null,
  // our own user data
  profile: null
}

const getters = {
// logged into firebase (authenticated account)
  isFirebaseAuthorised: ({ userAuthObject }) => !!userAuthObject,
  // TODO not sure if this is useful...
  hasProfile: ({ profile }) => !!profile,
  // logged into backend (existing profile) and authed with firebase
  isLoggedIn: ({ profile, userAuthObject }) => !!profile && !!userAuthObject,

  profile: ({ profile }) => profile,
  userAuthObject: ({ userAuthObject }) => userAuthObject,
  loading: ({ loading }) => loading,
  error: ({ error }) => error
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
  }
}

/* TODO CHANGE THESE TO ASYNC */
/* successful signIn returns an UserAuth object which has field user */
const actions = {
  async signIn({ commit, dispatch, state }, { email, password }) {
    commit('SET_LOADING', true)
    try {
      // this returns the 'usercredential' which is not the user object -.-
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

  /**
   * successful signup returns an UserAuth object.
   * UserAuth obj has field user which is what we're interested in
   * Currently, successful signUp will automatically sign in user.
   **/
  createAccount({ commit }, { email, password }) {
    commit('SET_LOADING', true)
    return auth.createUserWithEmailAndPassword(email, password)
      .then(({ user }) => commit('SET_USER', user))
      .catch(error => commit('ERROR', error.message))
      .finally(() => commit('SET_LOADING', false))
  },

  /**
  * Create user profile in the backend
  * Assume existing user
  */
  createProfile({ commit, state }, { displayName, gradYear, degree }) {
    commit('SET_LOADING', true)
    return createProfile(state.userAuthObject, { displayName, gradYear, degree })
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
      // if there's a 403 error code, it means it's a valid account but no profile exists yet
      // otherwise, completely abort auth
      if (!error.code || error.code !== 403) {
        commit('SET_USER', null)
        await auth.signOut()
      }
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
      // put it in the store
      commit('SET_USER', user)
    } catch (error) {
      commit('ERROR', error.message)
    }

    // no firebase auth, just get outta here
    if (!state.userAuthObject) {
      commit('SET_LOADING', false)
      return
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

    // we're authorized with firebase but there's no valid profile info yet
    await dispatch('getProfile')
    commit('SET_LOADING', false)
  },

  /**
   * simply send a password reset email... no need to be authorised or anything
   */
  sendPasswordResetEmail({ commit }, { email }) {
    commit('SET_LOADING', true)
    return auth.sendPasswordResetEmail(email)
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
