import Vue from 'vue'
import Vuex from 'vuex'
import questions from './questions'
import reviews from './reviews'
import course from './course'
import auth from './auth'
import subject from './subject'
import user from './user'
import global from './root'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    course,
    questions,
    reviews,
    auth,
    subject,
    user
  },
  ...global
})
