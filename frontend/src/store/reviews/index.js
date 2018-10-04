import {
  reviewMapper,
  replyMapper,
  newReviewMapper
} from '@/utils/api/reviews'

import { doRequestFactory } from '@/store/utils'

import { REQUEST, COMMITS, ACTIONS } from './constants'

const state = {
  loading: false,
  search: '',
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
  review: ({ reviewObj: { review } }) => review,
  replies: ({ reviewObj: { replies } }) => replies,
  loading: ({ loading }) => loading,
  error: ({ error }) => error
}

const mutations = {
  TOGGLE_LOADING (state, bool) {
    state.loading = bool
  },
  FOCUS_REVIEW (state, review) {
    state.reviewObj.review = reviewMapper(review)
  },
  FOCUS_REPLIES (state, replies) {
    state.reviewObj.replies = replies.map(replyMapper)
  },
  FOCUS_LIKES (state, { likes }) {
    state.reviewObj.review.likes = likes
    // TODO - ALREADY UPVOTED
  },
  API_ERROR (state, { code, message }) {
    state.error.code = code
    state.error.message = message
  },
  APPEND_REPLY(state, reply) {
    state.reviewObj.replies.unshift(replyMapper(reply))
  }
}

const actions = {
  doRequest: doRequestFactory(REQUEST, COMMITS),
  async getReview ({ dispatch }, { code, id }) {
    return dispatch('doRequest', { action: ACTIONS.GET_REVIEW, args: [code, id] })
  },
  async postReview ({ dispatch }, { code, form }) {
    const mappedForm = newReviewMapper(form)
    return dispatch('doRequest', { action: ACTIONS.POST_REVIEW, args: [code, mappedForm] })
  },
  async getReplies ({ dispatch }, { code, id }) {
    return dispatch('doRequest', { action: ACTIONS.GET_REPLIES, args: [code, id] })
  },
  async postReply ({ dispatch }, { code, id, form }) {
    return dispatch('doRequest', { action: ACTIONS.POST_REPLY, args: [code, id, form] })
  },
  async getLikes ({ dispatch }, { id, code }) {
    return dispatch('doRequest', { action: ACTIONS.GET_LIKES, args: [code, id] })
  },
  async putLikes ({ dispatch }, { id, code, data }) {
    return dispatch('doRequest', { action: ACTIONS.PUT_LIKES, args: [code, id, data] })
  },
  async getReplyLikes ({ dispatch }, { id, code, commentID }) {
    return dispatch('doRequest', { action: ACTIONS.GET_REPLY_LIKES, args: [code, id, commentID] })
  },
  async putReplyLikes ({ dispatch }, { id, code, commentID, data }) {
    return dispatch('doRequest', { action: ACTIONS.PUT_REPLY_LIKES, args: [code, id, commentID, data] })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
