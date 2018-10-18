import { get } from '../utils/api'
import { courseMapper } from '@/utils/api/course'

/* root application state */
const state = {
  error: '',
  loading: false,
  // cached courses
  courseMap: {}
}

const getters = {
  loading: ({ loading }) => loading,
  error: ({ error }) => error,
  // convert object to list
  courses: ({ courseMap }) => Object.values(courseMap)
}

const actions = {
  getCourses({ commit, getters }) {
    // avoid repeats of this
    if (getters.courses.length) {
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
  REFRESH_COURSES(state, courses) {
    // convert list of courses to object
    state.courseMap = courses
      .map(courseMapper)
      .reduce((acc, course) => {
        acc[course.code] = course
        return acc
      }, {})
  },
  UPDATE_COURSE(state, course) {
    // assumes courseMapper already applied...
    state.courseMap[course.code] = course
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
