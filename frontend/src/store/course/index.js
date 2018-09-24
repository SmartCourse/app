import { questionMapper } from '@/utils/api/questions'
import { reviewMapper } from '@/utils/api/reviews'
import { courseMapper } from '@/utils/api/course'

import { doRequestFactory } from '@/store/utils'

import { REQUEST, COMMITS, ACTIONS } from './constants'

const state = {
  loading: false,
  questions: [],
  reviews: [],
  course: {
    id: 0,
    code: '',
    name: '',
    rating: 0
  },
  error: {
    code: 0,
    message: ''
  }
}

const getters = {
  course: ({course}) => course,
  questions: ({questions}) => questions,
  reviews: ({reviews}) => reviews,
  loading: ({loading}) => loading,
  error: ({error}) => error
}

const mutations = {
  REFRESH_QUESTION_FEED (state, questions) {
    state.questions = questions.map(questionMapper)
  },
  REFRESH_REVIEW_FEED (state, reviews) {
    state.reviews = reviews.map(reviewMapper)
  },
  FOCUS_COURSE (state, course) {
    state.course = courseMapper(course)
  },
  TOGGLE_LOADING (state, bool) {
    state.loading = bool
  },
  API_ERROR (state, {code, message}) {
    state.error.code = code
    state.error.message = message
  }
}

const actions = {
  doRequest: doRequestFactory(REQUEST, COMMITS),
  async getQuestions ({dispatch}, {id, pageNumber}) {
    return dispatch('doRequest', { action: ACTIONS.GET_QUESTIONS, args: [id, pageNumber] })
  },
  async getReviews ({dispatch}, {id, pageNumber}) {
    return dispatch('doRequest', { action: ACTIONS.GET_REVIEWS, args: [id, pageNumber] })
  },
  async getCourse ({dispatch}, id) {
    return dispatch('doRequest', { action: ACTIONS.GET_COURSE, args: [id] })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
