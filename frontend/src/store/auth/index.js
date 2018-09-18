import firebase from 'firebase/app'
import 'firebase/auth'

import config from './config'

firebase.initializeApp(config)

const auth = firebase.auth
console.log(firebase, auth)

const state = {
  loading: false,
  error: '',
  success: ''
}

const getters = {
  loading: ({ loading }) => loading,
  isLoggedIn: () => !!auth().currentUser,
  error: ({ error }) => error,
  user: () => auth().currentUser
}

const mutations = {
  ERROR(state, message) {
    state.error = message
  },
  SIGN_UP(state, user) {
    console.log('LOGIN', user)
    state.success = 'Your account has been successfully created!'
  },
  LOGIN(state, user) {
    console.log('LOGIN', user)
  }
}

const actions = {
  signIn({commit}, { email, password }) {
    if (!(email && password)) {
      return commit('ERROR', 'Missing fields')
    }

    return auth().signInWithEmailAndPassword(email, password)
      .then(user => commit('LOGIN', user))
      .catch(error => commit('ERROR', error.message))
  },

  logout({commit}) {
    return auth().signOut()
      .catch(error => commit('ERROR', error.message))
  },

  signUp({commit}, { email, password }) {
    if (!(email && password)) {
      return commit('ERROR', 'Missing fields')
    }
    return auth().createUserWithEmailAndPassword(email, password)
      .then(user => commit('SIGN_UP', user))
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
