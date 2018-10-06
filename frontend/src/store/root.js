import { get } from '../utils/api'

/* root application state */
const state = {
  loading: false,
  // cached courses
  courses: [],
  // fire authObject
  userAuthObject: {},
  // our own user data
  profile: {}
}

const getters = {
  isLoggedIn: ({ userAuthObject }) => !!userAuthObject,
  authObject: ({ userAuthObject }) => userAuthObject
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
  },
  /**
   * @param {*} state The root state
   * @param {*} user  The logged in user object or null
   */
  SET_USER(state, user) {
    state.userAuthObject = user
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
