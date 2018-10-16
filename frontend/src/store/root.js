import { get } from '../utils/api'
import { courseMapper } from '@/utils/api/course'

/* root application state */
const state = {
  error: '',
  loading: false,
  // cached courses
  courses: []
}

const getters = {
  loading: ({ loading }) => loading,
  error: ({ error }) => error,
  courses: ({ courses }) => courses
}

const actions = {
  getCourses({ commit, state }) {
    // avoid repeats of this
    if (state.courses.length) {
      return
    }
    commit('TOGGLE_LOADING', true)
    return get('/course')
      .then(data => commit('REFRESH_COURSES', data))
      .catch(err => console.warn(err))
      .finally(() => commit('TOGGLE_LOADING', false))
  }
}

const mutations = {
  TOGGLE_LOADING(state, bool) {
    state.loading = bool
  },
  REFRESH_COURSES(state, data) {
    state.courses = data.map(courseMapper)
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
