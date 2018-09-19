import firebase from 'firebase/app'
import 'firebase/auth'

import config from './config'

firebase.initializeApp(config)

export const auth = firebase.auth()

const state = {
  loading: false,
  error: '',
  success: '',
  user: null
}

const getters = {
  loading: ({ loading }) => loading,
  isLoggedIn: ({ user }) => !!user,
  error: ({ error }) => error,
  user: ({ user }) => user
}

setInterval(() => {
  console.log('Background Auth state check: ', !!auth.currentUser)
}, 10000)

const mutations = {
  ERROR(state, message) {
    console.log('ERROR', message)
    state.error = message
  },
  SIGN_UP(state, user) {
    // on successful signup communicate with backend to update database.
    // If by email, new users are signed in by default
    console.log('SIGN UP', user)
    state.success = 'Your account has been successfully created!'
    state.user = user
  },
  LOGIN(state, user) {
    // login happens in indexedDB in chrome, localStorage in other browsers
    console.log('LOGIN', user)
    state.user = user
  },
  LOGOUT(state) {
    state.user = null
    console.log('LOGOUT EVENT')
  },
  UPDATE(state, user) {
    // useful for intial boot
    console.log(user)
    state.user = user
  }
}

const actions = {
  signIn({commit}, { email, password }) {
    if (!(email && password)) {
      return commit('ERROR', 'Missing fields')
    }

    return auth.signInWithEmailAndPassword(email, password)
      .then(user => commit('LOGIN', user))
      .catch(error => commit('ERROR', error.message))
  },

  logout({commit}) {
    return auth.signOut()
      .then(() => commit('LOGOUT'))
      .catch(error => commit('ERROR', error.message))
  },

  signUp({commit}, { email, password }) {
    if (!(email && password)) {
      return commit('ERROR', 'Missing fields')
    }

    return auth.createUserWithEmailAndPassword(email, password)
      .then(user => commit('SIGN_UP', user))
      .catch(error => commit('ERROR', error.message))
  },

  checkAuth({commit}) {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        unsubscribe()
        resolve(user)
      }, reject)
    })
      .then(user => {
        commit('UPDATE', user)
      })
      .catch(error => commit('ERROR', error.message))
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
