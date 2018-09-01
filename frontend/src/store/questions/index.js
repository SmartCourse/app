import {
  questionMapper,
  answerMapper
} from '@/utils/api/questions'

import { REQUEST, COMMITS, ACTIONS } from './constants'

const state = {
  loading: false,
  search: '',
  questions: [],
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
  feed: ({questions}) => questions.map(questionMapper),
  question: ({questionObj: {question}}) => questionMapper(question),
  answers: ({questionObj: {answers}}) => answers.map(answerMapper),
  loading: ({loading}) => loading,
  error: ({error}) => error
}

const mutations = {
  REFRESH_FEED (state, questions) {
    state.questions = questions
  },
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
  },
  POST_ANSWER (state, answer) {
    state.questionObj.answers.unshift(answer)
  }
}

const actions = {
  async doRequest({commit}, {action, args}) {
    commit('TOGGLE_LOADING', true)
    try {
      const data = await REQUEST[action](...args)
      commit(COMMITS[action], data)
    } catch (e) {
      commit('API_ERROR', e)
    } finally {
      commit('TOGGLE_LOADING', false)
    }
  },
  async getFeed ({dispatch}) {
    return dispatch('doRequest', { action: ACTIONS.GET_FEED, args: [] })
  },
  async getQuestion ({dispatch}, id) {
    return dispatch('doRequest', { action: ACTIONS.GET_QUESTION, args: [id] })
  },
  async getAnswers ({dispatch}, id) {
    return dispatch('doRequest', { action: ACTIONS.GET_ANSWERS, args: [id] })
  },
  async postAnswer ({commit}, { id, form }) {
    // fake failure/success
    // postAnswer() insert me later <----

    commit('TOGGLE_LOADING', true)
    // TODO real api request
    if (Math.random() > 0.5) {
      commit('API_ERROR', { code: 69, message: 'Error posting answer' })
      console.log('Pretending to error on posting answer!')
    } else {
      commit('POST_ANSWER', { id, title: form.title, body: form.body })
      console.log('Pretending to successfully post answer!')
    }
    commit('TOGGLE_LOADING', false)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
