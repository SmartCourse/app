import { get } from '../utils/api'
import { courseMapper } from '@/utils/api/course'

/* root application state */
const state = {
  error: '',
  loading: false,
  // cached courses
  courseMap: {},
  faculties: [],
  degrees: []
}

const getters = {
  loading: ({ loading }) => loading,
  error: ({ error }) => error,
  // convert object to list
  courses: ({ courseMap }) => Object.values(courseMap),
  faculties: ({ faculties }) => faculties,
  degrees: ({ degrees }) => degrees
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
  },
  getFaculties({ commit, getters }) {
    // avoid repeats of this
    if (getters.faculties.length) {
      return
    }
    return get('/uni/faculties')
      .then(data => commit('REFRESH_FACULTIES', data))
      .catch(err => console.warn(err))
  },
  getDegrees({ commit, getters }) {
    // avoid repeats of this
    if (getters.degrees.length) {
      return
    }
    return get('/uni/degrees')
      .then(data => commit('REFRESH_DEGREES', data))
      .catch(err => console.warn(err))
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
  REFRESH_FACULTIES(state, faculties) {
    state.faculties = faculties
  },
  REFRESH_DEGREES(state, degrees) {
    state.degrees = degrees
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
