import { get } from '../utils/api'

/* root application state */
const state = {
  loading: false,
  // cached courses
  courses: [],
  // firebase authObject
  userAuthObject: {},
  // our own user data
  profile: {}
}

const getters = {
  authObject: ({ userAuthObject }) => userAuthObject,
  // logged into firebase (authenticated account)
  isLoggedIn: ({ userAuthObject }) => !!Object.keys(userAuthObject).length,
  // logged into backend (existing profile)
  hasProfile: ({ profile }) => !!Object.keys(profile).length
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
    state.userAuthObject = user || {}
  },
  SET_PROFILE(state, profile) {
    state.profile = profile || {}
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
