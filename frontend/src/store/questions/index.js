import {
  questionMapper,
  answerMapper
} from '@/utils/api/questions'

import { doRequestFactory, sortByHotness } from '@/store/utils'

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
    if (!answers.length) {
      state.questionObj.answers = []
      return
    }
    const mapped = answers.map(answerMapper)

    // get the most upvoted answer
    const { ans, index } = mapped.reduce(
      ({ ans, index }, curr, i) => (curr.likes >= ans.likes ? { ans: curr, index: i } : {ans, index}),
      { ans: { likes: -1 }, index: -1 }
    )
    // only set answer as 'accepted' if it has >= 2 likes
    if (ans.likes > 1) {
      ans['accepted'] = true
    }
    // remove it & sort
    const ordered = sortByHotness([...mapped.slice(0, index), ...mapped.slice(index + 1)])

    state.questionObj.answers = [ans, ...ordered]
  },
  /**
   * Given the post returns the location of the new resource,
   * extract it and store it for future use.
   *
   * @param {string} resourceUrl The full url of the resource on the server
   */
  SET_QUESTION(state, resourceUrl) {
    const [id] = resourceUrl.match(/\d+$/)
    state.questionObj.question.id = id
  },
  FOCUS_LIKES (state, { likes }) {
    const oldLikes = state.questionObj.question.likes
    state.questionObj.question.likes = likes
    state.questionObj.question.userLiked += likes - oldLikes
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
    return dispatch('doRequest', { action: ACTIONS.GET_QUESTION, load: 'TOGGLE_LOADING_QUESTION', args: [code, id] })
  },
  async postQuestion ({ dispatch }, { code, form }) {
    return dispatch('doRequest', { action: ACTIONS.POST_QUESTION, load: 'TOGGLE_LOADING_QUESTION', args: [code, form] })
  },
  async getAnswers ({ dispatch }, { code, id }) {
    return dispatch('doRequest', { action: ACTIONS.GET_ANSWERS, load: 'TOGGLE_LOADING_ANSWERS', args: [code, id] })
  },
  async postAnswer ({ dispatch }, { id, code, form }) {
    return dispatch('doRequest', { action: ACTIONS.POST_ANSWER, load: 'TOGGLE_LOADING_ANSWERS', args: [code, id, form] })
  },
  async getLikes ({ dispatch }, { id, code }) {
    return dispatch('doRequest', { action: ACTIONS.GET_LIKES, load: '', args: [code, id] })
  },
  async putLikes ({ dispatch }, { id, code, data }) {
    return dispatch('doRequest', { action: ACTIONS.PUT_LIKES, load: '', args: [code, id, data] })
  },
  async getAnswerLikes ({ dispatch }, { id, code, commentID }) {
    return dispatch('doRequest', { action: ACTIONS.GET_ANSWER_LIKES, load: '', args: [code, id, commentID] })
  },
  async putAnswerLikes ({ dispatch }, { id, code, commentID, data }) {
    return dispatch('doRequest', { action: ACTIONS.PUT_ANSWER_LIKES, load: '', args: [code, id, commentID, data] })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
