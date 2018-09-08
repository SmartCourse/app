import Vue from 'vue'
import Vuex from 'vuex'
import questions from './questions'
import reviews from './reviews'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    questions,
    reviews
  }
})
