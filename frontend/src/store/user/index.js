import { doRequestFactory } from '@/store/utils'
import { REQUEST, COMMITS, ACTIONS } from './constants'

const state = {
  loading: false,
  userObj: {},
  error: {
    code: 0,
    message: ''
  }
}

const getters = {
  // convert subjects object to array [{code, name, handbookURL}, ...]
  userObj: ({ userObj }) => userObj,
  loading: ({ loading }) => loading,
  error: ({ error }) => error
}

const mutations = {
  REFRESH_USER (state, user) {
    state.userObj = user
  },
  TOGGLE_LOADING (state, bool) {
    state.loading = bool
  },
  API_ERROR (state, { code, message }) {
    state.error.code = code
    state.error.message = message
  }
}

const actions = {
  doRequest: doRequestFactory(REQUEST, COMMITS),
  async getUser({ dispatch }, { id }) {
    return dispatch('doRequest', { action: ACTIONS.GET_USER, args: [id] })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
