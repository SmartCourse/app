import { questionMapper } from '@/utils/api/questions'
import { reviewMapper } from '@/utils/api/reviews'
import { courseMapper } from '@/utils/api/course'

import { doRequestFactory } from '@/store/utils'

import { REQUEST, COMMITS, ACTIONS } from './constants'

const state = {
  loading: false,
  questionsMeta: {},
  questions: [],
  reviewsMeta: {},
  reviews: [],
  course: {
    id: 0,
    code: '',
    name: ''
  },
  error: {
    code: 0,
    message: ''
  }
}

const getters = {
  course: ({course}) => course,
  ratings: ({course}) => [
    {text: 'Recommended', value: course.recommend || 0},
    {text: 'Enjoyment', value: course.enjoy || 0},
    {text: 'Difficulty', value: course.difficulty || 0},
    {text: 'Teaching', value: course.teaching || 0},
    {text: 'Workload', value: course.workload || 0}
  ],
  questions: ({questions}) => {
    console.log(questions[0])
    return questions
  },
  questionsMeta: ({questionsMeta}) => questionsMeta,
  reviews: ({reviews}) => { console.log(reviews[0]); return reviews },
  reviewsMeta: ({reviewsMeta}) => reviewsMeta,
  loading: ({loading}) => loading,
  error: ({error}) => error
}

const mutations = {
  REFRESH_QUESTION_FEED (state, { meta, data }) {
    state.questions = data.map(questionMapper)
    state.questionsMeta = meta
  },
  REFRESH_REVIEW_FEED (state, { meta, data }) {
    state.reviews = data.map(reviewMapper)
    state.reviewsMeta = meta
  },
  FOCUS_COURSE (state, course) {
    state.course = courseMapper(course)
  },
  TOGGLE_LOADING (state, bool) {
    state.loading = bool
  },
  API_ERROR (state, { code, message }) {
    state.error.code = code
    state.error.message = message
  }
}

const actions = {
  doRequest: doRequestFactory(REQUEST, COMMITS),
  async getQuestions ({ dispatch }, { id, pageNumber }) {
    return dispatch('doRequest', { action: ACTIONS.GET_QUESTIONS, args: [id, pageNumber] })
  },
  async getReviews ({ dispatch }, { id, pageNumber }) {
    return dispatch('doRequest', { action: ACTIONS.GET_REVIEWS, args: [id, pageNumber] })
  },
  async getCourse ({ dispatch }, id) {
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
