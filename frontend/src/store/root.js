import { get } from '../utils/api'
import { courseMapper } from '@/utils/api/course'

/* root application state */
const state = {
  error: '',
  loading: false,
  // cached courses
  courseMap: {}, // this allows us to update courses efficiently
  courseList: []
}

const getters = {
  loading: ({ loading }) => loading,
  error: ({ error }) => error,
  // convert object to list
  courses: ({ courseList }) => courseList
}

const actions = {
  getCourses({ commit, state }) {
    // avoid repeats of this
    if (state.courseList.length) {
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
    state.courseList = courses
    // convert list of courses to object
    state.courseMap = courses
      .map(courseMapper)
      .reduce((acc, course, index) => {
        acc[course.code] = {...course, index} // store the index into the list
        return acc
      }, {})
  },
  UPDATE_COURSE(state, course) {
    const index = state.courseMap[course.code].index
    state.courseMap[course.code] = { ...course, index }
    state.courseList[index] = course
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
