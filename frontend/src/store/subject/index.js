import { subjectMapper } from '@/utils/api/subject'
import { courseMapper } from '@/utils/api/course'

import { doRequestFactory } from '@/store/utils'

import { REQUEST, COMMITS, ACTIONS } from './constants'

const state = {
  loading: false,
  subjects: {},
  courses: [],
  error: {
    code: 0,
    message: ''
  }
}

const getters = {
  courses: ({ courses }) => courses,
  // convert subjects object to array [{code, name, handbookURL}, ...]
  subjectList: ({ subjects }) => Object.entries(subjects)
    .map(([code, { name, handbookURL }]) => ({ code, name, handbookURL }))
    .sort((a, b) => a.code.localeCompare(b.code)),
  subjectMap: ({ subjects }) => subjects,
  loading: ({ loading }) => loading,
  error: ({ error }) => error
}

const mutations = {
  REFRESH_SUBJECTS (state, subjects) {
    state.subjects = subjects
      .map(subjectMapper)
    // convert array to object {code: {name, handbookURL}, code: { ... }, ...}
      .reduce((acc, { code, name, handbookURL }) => {
        acc[code] = { name, handbookURL }
        return acc
      }, {})
  },
  REFRESH_COURSES (state, courses) {
    state.courses = courses.map(courseMapper)
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
  async getSubjects ({ dispatch }) {
    return dispatch('doRequest', { action: ACTIONS.GET_SUBJECTS, args: [] })
  },
  async getCourses ({ dispatch }, subjCode) {
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
