import Vue from 'vue'
import Vuex from 'vuex'
import { getQuestions } from './utils/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    search: '',
    questions: []
  },
  mutations: {
    REFRESH_FEED (state, questions) {
      state.questions = questions
    }
  },
  actions: {
    async getFeed ({commit}) {
      const questions = await getQuestions()
      commit('REFRESH_FEED', questions)
    }
  }
})
