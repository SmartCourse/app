import {
  questionMapper,
  answerMapper
} from '@/utils/api/questions'

import { doRequestFactory } from '@/store/utils'

import { REQUEST, COMMITS, ACTIONS } from './constants'

const state = {
  loadingAnswers: false,
  loadingQuestion: false,
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
  question: ({ questionObj: { question } }) => question,
  answers: ({ questionObj: { answers } }) => answers,
  loadingAnswers: ({ loadingAnswers }) => loadingAnswers,
  loadingQuestion: ({ loadingQuestion }) => loadingQuestion,
  error: ({ error }) => error
}

const mutations = {
  TOGGLE_LOADING_ANSWERS (state, bool) {
    state.loadingAnswers = bool
  },
  TOGGLE_LOADING_QUESTION (state, bool) {
    state.loadingQuestion = bool
  },
  FOCUS_QUESTION (state, question) {
    state.questionObj.question = questionMapper(question)
  },
  FOCUS_ANSWERS (state, answers) {
    state.questionObj.answers = answers.map(answerMapper)
  },
  FOCUS_LIKES (state, { likes }) {
    state.questionObj.question.likes = likes
    // TODO - ALREADY UPVOTED
  },
  API_ERROR (state, { code, message }) {
    state.error.code = code
    state.error.message = message
  },
  APPEND_ANSWER(state, answer) {
    state.questionObj.answers.unshift(answerMapper(answer))
  }
}

const actions = {
  doRequest: doRequestFactory(REQUEST, COMMITS),
  async getQuestion ({ dispatch }, { code, id }) {
    return dispatch('doRequest', { action: ACTIONS.GET_QUESTION, load:'TOGGLE_LOADING_QUESTION', args: [code, id] })
  },
  async postQuestion ({ dispatch }, { code, form }) {
    return dispatch('doRequest', { action: ACTIONS.POST_QUESTION, load:'TOGGLE_LOADING_QUESTION', args: [code, form] })
  },
  async getAnswers ({ dispatch }, { code, id }) {
    return dispatch('doRequest', { action: ACTIONS.GET_ANSWERS, load:'TOGGLE_LOADING_ANSWERS', args: [code, id] })
  },
  async postAnswer ({ dispatch }, { id, code, form }) {
    return dispatch('doRequest', { action: ACTIONS.POST_ANSWER, load:'TOGGLE_LOADING_ANSWERS', args: [code, id, form] })
  },
  async getLikes ({ dispatch }, { id, code }) {
    return dispatch('doRequest', { action: ACTIONS.GET_LIKES, load:'TOGGLE_LOADING_QUESTION', args: [code, id] })
  },
  async putLikes ({ dispatch }, { id, code, data }) {
    return dispatch('doRequest', { action: ACTIONS.PUT_LIKES, load:'TOGGLE_LOADING_QUESTION', args: [code, id, data] })
  },
  async getAnswerLikes ({ dispatch }, { id, code, commentID }) {
    return dispatch('doRequest', { action: ACTIONS.GET_ANSWER_LIKES, load:'TOGGLE_LOADING_ANSWERS', args: [code, id, commentID] })
  },
  async putAnswerLikes ({ dispatch }, { id, code, commentID, data }) {
    return dispatch('doRequest', { action: ACTIONS.PUT_ANSWER_LIKES, load:'TOGGLE_LOADING_ANSWERS', args: [code, id, commentID, data] })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
