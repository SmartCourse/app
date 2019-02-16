import { get } from '../utils/api'
import { startLoad, endLoad } from '../utils/helpers'
import { courseMapper } from '@/utils/api/course'
import { questionMapper } from '@/utils/api/questions'

/* root application state */
const state = {
  error: '',
  loading: false,
  // cached courses
  courseMap: {},
  faculties: [],
  degrees: [],
  sessions: [],
  feeds: {
    questions: [],
    reviews: []
  }
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
    } else {
      startLoad('Courses')
    }

    commit('TOGGLE_LOADING', true)
    return get('/course')
      .then(data => commit('REFRESH_COURSES', data))
      .catch(err => console.warn(err.message))
      .finally(() => commit('TOGGLE_LOADING', false))
      .then(endLoad)
  },
  getFaculties({ commit, getters }) {
    // avoid repeats of this
    if (getters.faculties.length) {
      return
    } else {
      startLoad('Faculties')
    }

    return get('/uni/faculties')
      .then(data => commit('LOAD_FACULTIES', data))
      .catch(err => console.warn(err.message))
      .then(endLoad)
  },
  getDegrees({ commit, getters }) {
    // avoid repeats of this
    if (getters.degrees.length) {
      return
    } else {
      startLoad('Degrees')
    }

    return get('/uni/degrees')
      .then(data => commit('LOAD_DEGREES', data))
      .catch(err => console.warn(err.message))
      .then(endLoad)
  },
  getSessions({ commit, getters }) {
    // avoid repeats of this
    if (getters.sessions.length) {
      return
    } else {
      startLoad('Sessions')
    }

    return get('/uni/sessions')
      .then(data => commit('LOAD_SESSIONS', data))
      .catch(err => console.warn(err.message))
      .then(endLoad)
  },
  getFeeds({ commit }) {
    return get('/uni/feed')
      .then(data => commit('UPDATE_FEEDS', data))
      .catch(err => console.warn(err.message))
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
  },
  UPDATE_FEEDS(state, feeds) {
    state.feeds.questions = feeds.map(questionMapper)
    state.feeds.reviews = feeds.map(questionMapper)
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
