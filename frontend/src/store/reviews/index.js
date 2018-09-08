import {
  reviewMapper,
  replyMapper
} from '@/utils/api/reviews'

import { doRequestFactory } from '@/store/utils'

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
  reviews: ({reviews}) => reviews.map(reviewMapper),
  review: ({reviewObj: {review}}) => reviewMapper(review),
  replies: ({reviewObj: {replies}}) => replies.map(replyMapper),
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
    state.reviewObj.review = review
  },
  FOCUS_REPLIES (state, replies) {
    state.reviewObj.replies = replies
  },
  API_ERROR (state, {code, message}) {
    state.error.code = code
    state.error.message = message
  }
}

const actions = {
  doRequest: doRequestFactory(REQUEST, COMMITS),
  async getReviews ({dispatch}) {
    return dispatch('doRequest', { action: ACTIONS.GET_REVIEWS, args: [] })
  },
  async getReview ({dispatch}, id) {
    return dispatch('doRequest', { action: ACTIONS.GET_REVIEW, args: [id] })
  },
  async getReplies ({dispatch}, id) {
    return dispatch('doRequest', { action: ACTIONS.GET_REPLIES, args: [id] })
  },
  async postReply ({dispatch}, { id, form }) {
    return dispatch('doRequest', { action: ACTIONS.POST_REPLY, args: [id, form] })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
