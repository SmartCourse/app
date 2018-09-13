import Vue from 'vue'
import Vuex from 'vuex'
import questions from './questions'
import reviews from './reviews'
import course from './course'
import global from './root'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    course,
    questions,
    reviews
  },
  ...global
})
