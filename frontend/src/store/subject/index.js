import { subjectMapper } from '@/utils/api/subject'

import { doRequestFactory } from '@/store/utils'

import { REQUEST, COMMITS, ACTIONS } from './constants'

const state = {
  loading: false,
  subjects: {},
  error: {
    code: 0,
    message: ''
  }
}

const getters = {
  // convert subjects object to array [{code, name, handbookURL}, ...]
  subjectList: ({ subjects }) => Object.entries(subjects)
    .map(([code, { name, handbookURL }]) => ({ code, name, handbookURL }))
    .sort((a, b) => a.code.localeCompare(b.code)),
  subjectMap: ({ subjects }) => subjects,
  loading: ({ loading }) => loading,
  error: ({ error }) => error
}

const mutations = {
  REFRESH_SUBJECTS (state, subjects) {
    state.subjects = subjects
      .map(subjectMapper)
    // convert array to object {code: {name, handbookURL}, code: { ... }, ...}
      .reduce((acc, { code, name, handbookURL }) => {
        acc[code] = { name, handbookURL }
        return acc
      }, {})
  },
  TOGGLE_LOADING (state, bool) {
    state.loading = bool
  },
  API_ERROR (state, { code, message }) {
    state.error.code = code
    state.error.message = message
  }
}

const actions = {
  doRequest: doRequestFactory(REQUEST, COMMITS),
  async getSubjects ({ dispatch }) {
    return dispatch('doRequest', { action: ACTIONS.GET_SUBJECTS, args: [] })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
