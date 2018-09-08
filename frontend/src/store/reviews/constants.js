import {
  getReviews,
  getReview,
  getReplies,
  postReply
} from '@/utils/api/reviews'

export const ACTIONS = {
  GET_REVIEWS: Symbol('getReviews'),
  GET_REVIEW: Symbol('getReview'),
  GET_REPLIES: Symbol('getReplies'),
  GET_REPLY: Symbol('postReply')
}

export const REQUEST = {
  [ACTIONS.GET_REVIEWS]: getReviews,
  [ACTIONS.GET_REVIEW]: getReview,
  [ACTIONS.GET_REPLIES]: getReplies,
  [ACTIONS.GET_REPLY]: postReply
}

export const COMMITS = {
  [ACTIONS.GET_REVIEWS]: 'REFRESH_FEED',
  [ACTIONS.GET_REVIEW]: 'FOCUS_REVIEW',
  [ACTIONS.GET_REPLIES]: 'FOCUS_REPLIES',
  [ACTIONS.GET_REPLY]: 'FOCUS_REPLIES'
}
