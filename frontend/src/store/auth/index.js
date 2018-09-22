import firebase from 'firebase/app'
import 'firebase/auth'

import config from './config'
import {get} from '../../utils/api'

firebase.initializeApp(config)

export const auth = firebase.auth()

function sendAuthToken(user) {
  return user.getIdToken(/* forceRefresh true */)
    .then(idToken => {
      return get('/user', {
        headers: {
          'Authorization': 'Bearer ' + idToken
        },
        mode: 'cors'
      })
    }).catch(err => {
      console.warn(err)
    })
}

const state = {
  loading: false,
  error: '',
  user: null
}

const getters = {
  loading: ({ loading }) => loading,
  isLoggedIn: ({ user }) => !!user,
  error: ({ error }) => error,
  user: ({ user }) => user
}

const mutations = {
  ERROR(state, message) {
    console.log('ERROR', message)
    state.error = message
  },
  SIGN_UP(state, user) {
    // on successful signup communicate with backend to update database.
    // If by email, new users are signed in by default
    console.log('SIGN UP', user)
    sendAuthToken(user)
    state.user = user
  },
  LOGIN(state, user) {
    // login happens in indexedDB in chrome, localStorage in other browsers
    console.log('LOGIN', user)
    sendAuthToken(user)
    state.user = user
  },
  LOGOUT(state) {
    state.user = null
    console.log('LOGOUT EVENT')
  },
  UPDATE(state, user) {
    // useful for intial boot
    console.log(user)
    if (user) sendAuthToken(user)
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
