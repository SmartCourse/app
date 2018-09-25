import { subjectMapper } from '@/utils/api/subject'
import { courseMapper } from '@/utils/api/course'

import { doRequestFactory } from '@/store/utils'

import { REQUEST, COMMITS, ACTIONS } from './constants'

const state = {
  loading: false,
  subjects: [],
  courses: [],
  error: {
    code: 0,
    message: ''
  }
}

const getters = {
  courses: ({courses}) => courses,
  subjects: ({subjects}) => subjects,
  loading: ({loading}) => loading,
  error: ({error}) => error
}

const mutations = {
  REFRESH_SUBJECTS (state, subjects) {
    state.subjects = subjects.map(subjectMapper)
  },
  REFRESH_COURSES (state, courses) {
    state.courses = courses.map(courseMapper)
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
  async getSubjects ({dispatch}) {
    return dispatch('doRequest', { action: ACTIONS.GET_SUBJECTS, args: [] })
  },
  async getCourses ({dispatch}, subjCode) {
    return dispatch('doRequest', { action: ACTIONS.GET_COURSES, args: [subjCode] })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
