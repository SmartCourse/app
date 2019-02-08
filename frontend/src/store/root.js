import { get } from '../utils/api'
import { courseMapper } from '@/utils/api/course'

const endLoad = () => {
  if (window && window.__loader) window.__loader.endLoad()
}

/* root application state */
const state = {
  error: '',
  loading: false,
  // cached courses
  courseMap: {},
  faculties: [],
  degrees: [],
  sessions: []
}

const getters = {
  loading: ({ loading }) => loading,
  error: ({ error }) => error,
  // convert object to list
  courses: ({ courseMap }) => Object.values(courseMap),
  faculties: ({ faculties }) => faculties,
  degrees: ({ degrees }) => degrees,
  sessions: ({ sessions }) => sessions
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
      .then(data => commit('LOAD_FACULTIES', data))
      .catch(err => console.warn(err))
      .then(endLoad)
  },
  getDegrees({ commit, getters }) {
    // avoid repeats of this
    if (getters.degrees.length) {
      return
    }

    return get('/uni/degrees')
      .then(data => commit('LOAD_DEGREES', data))
      .catch(err => console.warn(err))
      .then(endLoad)
  },
  getSessions({ commit, getters }) {
    // avoid repeats of this
    if (getters.sessions.length) {
      return
    }

    return get('/uni/sessions')
      .then(data => commit('LOAD_SESSIONS', data))
      .catch(err => console.warn(err))
      .then(endLoad)
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
      .reduce((courseMap, course) => {
        courseMap[course.code] = course
        return courseMap
      }, {})
  },
  LOAD_FACULTIES(state, faculties) {
    state.faculties = faculties
  },
  LOAD_DEGREES(state, degrees) {
    state.degrees = degrees
  },
  LOAD_SESSIONS(state, sessions) {
    const currentYear = new Date().getFullYear()
    state.sessions = sessions.filter(session => session.year <= currentYear)
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
