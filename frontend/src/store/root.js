
const state = {
  loading: false,
  search: []
}

const actions = {
  populateSearch({commit}) {
    commit()
  },
  togglePageLoad() {}
}

const mutations = {
  SET_LOADING(state, bool) {
    state.loading = bool
  },
  POPULATE_SEARCH(state, data) {
    state.search = data
  }
}

export default {
  state,
  actions,
  mutations
}
