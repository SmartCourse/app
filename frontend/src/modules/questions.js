import { getQuestions, getQuestion, postAnswer } from '@/utils/api'
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
    return questions.map(({ id, meta: {uid}, title, body }) => ({
      id,
      title,
      body,
      author: uid,
      published: format(Date.now(), 'DD/MM/YY')
    }))
  },
  question: ({questionObj: {question}}) => question,
  answers: ({questionObj: {answers}}) => answers,
  loading: ({loading}) => loading
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
  API_ERROR(state, response) {
    state.error.code = response.status
    state.error.message = response.statusText
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
  async postAnswer ({commit}, {id, form}) {
    console.log(`form: ${form}, id: ${id}`)
    /*
    commit('TOGGLE_LOADING', true)
    // TODO consistent method for dealing with api errors
    // post the answer to the api
    let resp = await postAnswer(id, form)
    if (resp.ok) {
      // update the store if the response was successful
      // TODO handle error here too...
      commit('FOCUS_QUESTION', await getQuestion(id))
    } else {
      commit('API_ERROR', resp)
      console.log(resp.statusText)
    }
    commit('TOGGLE_LOADING', false)
    */
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
