import { getQuestions, getQuestion } from '@/utils/api'

const state = {
  loading: false,
  search: '',
  questions: [],
  error: ''
}

const getters = {
  feed: ({questions}) => {
    return questions.map(({ id, uid, title, body }) => ({
      id,
      title,
      body,
      author: uid
    }))
  }
}

const mutations = {
  REFRESH_FEED (state, questions) {
    state.questions = questions
  },
  TOGGLE_LOADING (state, bool) {
    state.loading = bool
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
    commit('REFRESH_FEED', await getQuestion(id))
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