import {
  getReview,
  getReplies,
  postReview
} from '@/utils/api/reviews'

export const ACTIONS = {
  GET_REVIEW: Symbol('getReview'),
  GET_REPLIES: Symbol('getReplies'),
  POST_REVIEW: Symbol('postReview')
}

export const REQUEST = {
  [ACTIONS.GET_REVIEW]: getReview,
  [ACTIONS.GET_REPLIES]: getReplies,
  [ACTIONS.POST_REVIEW]: postReview
}

export const COMMITS = {
  [ACTIONS.GET_REVIEW]: 'FOCUS_REVIEW',
  [ACTIONS.GET_REPLIES]: 'FOCUS_REPLIES',
  [ACTIONS.POST_REVIEW]: 'FOCUS_REVIEW'
}
