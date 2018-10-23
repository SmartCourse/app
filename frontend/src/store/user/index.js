import { doRequestFactory } from '@/store/utils'
import { REQUEST, COMMITS, ACTIONS } from './constants'
import { questionMapper } from '@/utils/api/questions'
import { userMapper } from '@/utils/api/user'

const state = {
  loading: false,
  userObj: {},
  error: {
    code: 0,
    message: ''
  },
  recentQuestions: []
}

const getters = {
  userObj: ({ userObj }) => userMapper(userObj),
  recentQuestions: ({ recentQuestions }) => recentQuestions.map(questionMapper),
  loading: ({ loading }) => loading,
  error: ({ error }) => error
}

const mutations = {
  REFRESH_USER (state, user) {
    state.userObj = user
  },
  REFRESH_QUESTIONS (state, questions) {
    state.recentQuestions = questions
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
  },

  async getUserQuestions({ dispatch }, { id }) {
    return dispatch('doRequest', { action: ACTIONS.GET_USER_QUESTIONS, args: [id] })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
