import {
  reviewMapper,
  replyMapper
} from '@/utils/api/reviews'

import { doRequestFactory, resetStateFactory, RESET_STATE } from '@/store/utils'

import { REQUEST, COMMITS, ACTIONS } from './constants'

const state = {
  loading: false,
  search: '',
  reviews: [],
  reviewObj: {
    review: {},
    replies: []
  },
  error: {
    code: 0,
    message: ''
  }
}

const getters = {
  review: ({reviewObj: {review}}) => review,
  replies: ({reviewObj: {replies}}) => replies,
  loading: ({loading}) => loading,
  error: ({error}) => error
}

const mutations = {
  REFRESH_FEED (state, reviews) {
    state.reviews = reviews
  },
  TOGGLE_LOADING (state, bool) {
    state.loading = bool
  },
  FOCUS_REVIEW (state, review) {
    state.reviewObj.review = reviewMapper(review)
  },
  FOCUS_REPLIES (state, replies) {
    state.reviewObj.replies = replies.map(replyMapper)
  },
  API_ERROR (state, {code, message}) {
    state.error.code = code
    state.error.message = message
  },
  RESET_STATE
}

const actions = {
  doRequest: doRequestFactory(REQUEST, COMMITS),
  resetState: resetStateFactory(state),
  async getReview ({dispatch}, id) {
    return dispatch('doRequest', { action: ACTIONS.GET_REVIEW, args: [id] })
  },
  async getReplies ({dispatch}, id) {
    return dispatch('doRequest', { action: ACTIONS.GET_REPLIES, args: [id] })
  },
  async postReview ({dispatch}, { id, form }) {
    return dispatch('doRequest', { action: ACTIONS.POST_REVIEW, args: [id, form] })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
