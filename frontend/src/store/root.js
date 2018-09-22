
import { get } from '../utils/api'

const state = {
  loading: false,
  courses: [],
  user: {}
}

const actions = {
  populateSearch({commit}) {
    return get('/course')
      .then(data => {
        commit('POPULATE_SEARCH', data)
      })
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
   * Eventually should expose user in the root state
   * @param {*} state The root state
   * @param {*} user  The logged in user object or null
   */
  SET_USER(state, user) {
    state.user = user
  }
}

export default {
  state,
  actions,
  mutations
}
