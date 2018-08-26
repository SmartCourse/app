import Vue from 'vue'
import Vuex from 'vuex'
import questions from './questions'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    questions
  }
})
