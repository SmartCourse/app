// firebase authentication class
import auth from './config'

import {createUser} from '@/utils/api/auth'

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
    if (message) console.log('AUTH ERROR', message)
    state.error = message
  },
  SET_LOADING(state, isLoading) {
    state.loading = isLoading
  }
}

/* successful signIn returns an UserAuth object which has field user */
const actions = {
  signIn({ commit }, { email, password }) {
    commit('SET_LOADING', true)
    return auth.signInWithEmailAndPassword(email, password)
      .then(({ user }) => commit('SET_USER', user, {root: true}))
      .catch(error => {
        commit('ERROR', error.message)
        throw error
      })
      .finally(() => commit('SET_LOADING', false))
  },

  /**
   * logout client side. Everything will be handled by
   * firebase for this.
   */
  logout({ commit }) {
    return auth.signOut()
      .then(() => commit('SET_USER', null, {root: true}))
      .catch(error => commit('ERROR', error.message))
  },

  /**
   * successful signup returns an UserAuth object.
   * UserAuth obj has field user which is what we're interested in
   * Currently, successful signUp will automatically sign in user.
   **/
  signUp({ commit }, { email, password }) {
    commit('SET_LOADING', true)
    return auth.createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        /* TODO implement retry if failure occurs on server
          Simultaneously:
          1. Send off new user creds for backend creation,
          2. Set user state in store.
         */
        return Promise.all([
          createUser(user),
          commit('SET_USER', user, { root: true })])
      })
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
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        unsubscribe()
        resolve(user)
      }, reject)
    })
      .then(user => commit('SET_USER', user, { root: true }))
      .catch(error => {
        commit('ERROR', error)
      })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
