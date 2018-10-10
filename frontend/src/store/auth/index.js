// firebase authentication class
import auth from './config'

import { createProfile, getSelf } from '@/utils/api/auth'

const state = {
  loading: false,
  error: ''
}

const getters = {
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
  }
}

/* TODO CHANGE THESE TO ASYNC */
/* successful signIn returns an UserAuth object which has field user */
const actions = {
  signIn({ commit }, { email, password }) {
    commit('SET_LOADING', true)
    return auth.signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        commit('SET_USER', user, { root: true })
        return getSelf(user)
      })
      .then(profile => {
        commit('SET_PROFILE', profile, { root: true })
      })
      .catch(error => {
        commit('ERROR', error.message)
        commit('SET_PROFILE', {}, { root: true })
        if (!error.code || error.code !== 403) {
          auth.signOut()
          commit('SET_USER', {}, { root: true })
        }
      })
      .finally(() => commit('SET_LOADING', false))
  },

  /**
   * logout client side. Everything will be handled by
   * firebase for this.
   */
  logout({ commit }) {
    return auth.signOut()
      .then(() => {
        commit('SET_USER', {}, { root: true })
        commit('SET_PROFILE', {}, { root: true })
      })
      .catch(error => commit('ERROR', error.message))
  },

  /**
   * successful signup returns an UserAuth object.
   * UserAuth obj has field user which is what we're interested in
   * Currently, successful signUp will automatically sign in user.
   **/
  createAccount({ commit }, { email, password }) {
    commit('SET_LOADING', true)
    return auth.createUserWithEmailAndPassword(email, password)
      .then(({ user }) => commit('SET_USER', user, { root: true }))
      .catch(error => {
        commit('ERROR', error.message)
        throw error
      })
      .finally(() => commit('SET_LOADING', false))
  },

  /**
  * Create user profile in the backend
  **/
  createProfile({ commit }, { user, displayName }) {
    commit('SET_LOADING', true)
    return createProfile(user, { displayName })
      .then((profile) => commit('SET_PROFILE', profile, { root: true }))
      .catch(error => {
        commit('ERROR', error.message)
        throw error
      })
      .finally(() => commit('SET_LOADING', false))
  },

  /**
   * Called on application boot once firebase has been initialised
   */
  checkAuth({ commit }) {
    commit('SET_LOADING', true)
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        unsubscribe()
        resolve(user)
      }, reject)
    })
      .then((user) => {
        if (user === null) throw Error('Not logged in')
        commit('SET_USER', user, { root: true })
        return getSelf(user)
      })
      .then(profile => {
        commit('SET_PROFILE', profile, { root: true })
      })
      .catch(error => {
        commit('ERROR', error.message)
        commit('SET_PROFILE', {}, { root: true })
        if (!error.code || error.code !== 403) {
          auth.signOut()
          commit('SET_USER', {}, { root: true })
        }
      })
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
