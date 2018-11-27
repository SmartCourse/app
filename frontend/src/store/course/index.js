import { questionMapper } from '@/utils/api/questions'
import { reviewMapper } from '@/utils/api/reviews'
import { courseMapper } from '@/utils/api/course'

import { doRequestFactory } from '@/store/utils'

import { REQUEST, COMMITS, ACTIONS } from './constants'

const state = {
  loadingCourse: false,
  loadingFeed: false,
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
  questions: ({questions}) => questions,
  questionsMeta: ({questionsMeta}) => questionsMeta,
  reviews: ({reviews}) => reviews,
  reviewsMeta: ({reviewsMeta}) => reviewsMeta,
  loadingCourse: ({loadingCourse}) => loadingCourse,
  loadingFeed: ({loadingFeed}) => loadingFeed,
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
  TOGGLE_LOADING_FEED (state, bool) {
    state.loadingFeed = bool
  },
  TOGGLE_LOADING_COURSE (state, bool) {
    state.loadingCourse = bool
  },
  API_ERROR (state, { code, message }) {
    state.error.code = code
    state.error.message = message
  }
}

const actions = {
  doRequest: doRequestFactory(REQUEST, COMMITS),
  async getQuestions ({ dispatch }, { id, pageNumber }) {
    return dispatch('doRequest', { action: ACTIONS.GET_QUESTIONS, load: 'TOGGLE_LOADING_FEED', args: [id, pageNumber] })
  },
  async getReviews ({ dispatch }, { id, pageNumber }) {
    return dispatch('doRequest', { action: ACTIONS.GET_REVIEWS, load: 'TOGGLE_LOADING_FEED', args: [id, pageNumber] })
  },
  async getCourse ({ state, commit, dispatch }, id) {
    await dispatch('doRequest', { action: ACTIONS.GET_COURSE, load: 'TOGGLE_LOADING_COURSE', args: [id] })
    commit('UPDATE_COURSE', state.course, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
