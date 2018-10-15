import { get } from '../utils/api'

/* root application state */
const state = {
  error: '',
  // cached courses
  courses: []
}

const getters = {
  loading: ({ auth, course, questions, reviews, subject }) =>
    [auth.loading, course.loading, questions.loading, reviews.loading, subject.loading].reduce((acc, curr) => acc || curr, false),
  error: ({ error }) => error
}

const actions = {
  populateSearch({ commit, state }) {
    // avoid repeats of this
    if (state.courses.length) {
      return
    }
    return get('/course')
      .then(data => commit('POPULATE_SEARCH', data))
      .catch(err => console.warn(err))
  },
  togglePageLoad() {}
}

const mutations = {
  SET_LOADING(state, bool) {
    state.loading = bool
  },
  POPULATE_SEARCH(state, data) {
    state.courses = data
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
