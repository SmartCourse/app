import { getQuestions, getQuestion } from '@/utils/api/questions'
import format from 'date-fns/format'

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
  feed: ({questions}) => {
    return questions.map(({ questionID, userID, title, body }) => ({
      questionID,
      title,
      body,
      author: userID,
      published: format(Date.now(), 'DD/MM/YY')
    }))
  },
  question: ({questionObj: {question}}) => question,
  answers: ({questionObj: {answers}}) => answers,
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
    state.questionObj = question
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
  async getFeed ({commit}) {
    commit('TOGGLE_LOADING', true)
    commit('REFRESH_FEED', await getQuestions())
    commit('TOGGLE_LOADING', false)
  },
  async getQuestion ({commit}, id) {
    commit('TOGGLE_LOADING', true)
    commit('FOCUS_QUESTION', await getQuestion(id))
    commit('TOGGLE_LOADING', false)
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
