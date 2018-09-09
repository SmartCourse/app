import {
  questionMapper,
  answerMapper
} from '@/utils/api/questions'

import { doRequestFactory } from '@/store/utils'

import { REQUEST, COMMITS, ACTIONS } from './constants'

const state = {
  loading: false,
  questionObj: {
    question: {},
    answers: []
  },
  error: {
    code: 0,
    message: ''
  }
}

const getters = {
  question: ({questionObj: {question}}) => questionMapper(question),
  answers: ({questionObj: {answers}}) => answers.map(answerMapper),
  loading: ({loading}) => loading,
  error: ({error}) => error
}

const mutations = {
  TOGGLE_LOADING (state, bool) {
    state.loading = bool
  },
  FOCUS_QUESTION (state, question) {
    state.questionObj.question = question
  },
  FOCUS_ANSWERS (state, answers) {
    state.questionObj.answers = answers
  },
  API_ERROR (state, {code, message}) {
    state.error.code = code
    state.error.message = message
  }
}

const actions = {
  doRequest: doRequestFactory(REQUEST, COMMITS),
  async getQuestion ({dispatch}, id) {
    return dispatch('doRequest', { action: ACTIONS.GET_QUESTION, args: [id] })
  },
  async postQuestion ({dispatch}, { id, form }) {
    return dispatch('doRequest', { action: ACTIONS.POST_QUESTION, args: [id, form] })
  },
  async getAnswers ({dispatch}, id) {
    return dispatch('doRequest', { action: ACTIONS.GET_ANSWERS, args: [id] })
  },
  async postAnswer ({dispatch}, { id, form }) {
    return dispatch('doRequest', { action: ACTIONS.POST_ANSWER, args: [id, form] })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
