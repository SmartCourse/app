import firebase from 'firebase/app'
import 'firebase/auth'

import config from './config'

firebase.initializeApp(config)

const auth = firebase.auth

const state = {
  loading: false,
  error: '',
  success: '',
  user: null
}

const getters = {
  loading: ({ loading }) => loading,
  isLoggedIn: () => !!auth().currentUser,
  error: ({ error }) => error,
  user: state => () => auth().currentUser
}

setInterval(() => {
  console.log('Auth state: ')
  console.log(!!auth().currentUser)
}, 5000)

const mutations = {
  ERROR(state, message) {
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
    console.log('LOGOUT EVENT')
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
      .then(() => commit('LOGOUT'))
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
