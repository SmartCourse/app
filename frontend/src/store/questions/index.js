import {
  questionMapper,
  answerMapper
} from '@/utils/api/questions'

import { doRequestFactory } from '@/store/utils'

import { REQUEST, COMMITS, ACTIONS } from './constants'

const state = {
  loading: false,
  search: '',
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
  question: ({questionObj: {question}}) => question,
  answers: ({questionObj: {answers}}) => answers,
  loading: ({loading}) => loading,
  error: ({error}) => error
}

const mutations = {
  TOGGLE_LOADING (state, bool) {
    state.loading = bool
  },
  FOCUS_QUESTION (state, question) {
    state.questionObj.question = questionMapper(question)
  },
  FOCUS_ANSWERS (state, answers) {
    state.questionObj.answers = answers.map(answerMapper)
  },
  API_ERROR (state, {code, message}) {
    state.error.code = code
    state.error.message = message
  },
  APPEND_ANSWER(state, answer) {
    state.questionObj.answers.unshift(answerMapper(answer))
  }
}

const actions = {
  doRequest: doRequestFactory(REQUEST, COMMITS),
  async getQuestion ({dispatch}, { code, id }) {
    return dispatch('doRequest', { action: ACTIONS.GET_QUESTION, args: [code, id] })
  },
  async postQuestion ({dispatch}, { code, form }) {
    return dispatch('doRequest', { action: ACTIONS.POST_QUESTION, args: [code, form] })
  },
  async putQuestion ({dispatch}, {code, id, data}) {
    return dispatch('doRequest', { action: ACTIONS.PUT_QUESTION, args: [code, id, data] })
  },
  async getAnswers ({dispatch}, { code, id }) {
    return dispatch('doRequest', { action: ACTIONS.GET_ANSWERS, args: [code, id] })
  },
  async postAnswer ({dispatch}, { id, code, form }) {
    return dispatch('doRequest', { action: ACTIONS.POST_ANSWER, args: [code, id, form] })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
