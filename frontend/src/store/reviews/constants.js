import {
  getReview,
  getReplies,
  postReview,
  postReply
} from '@/utils/api/reviews'

export const ACTIONS = {
  GET_REVIEW: Symbol('getReview'),
  GET_REPLIES: Symbol('getReplies'),
  POST_REVIEW: Symbol('postReview'),
  POST_REPLY: Symbol('postReply')
}

export const REQUEST = {
  [ACTIONS.GET_REVIEW]: getReview,
  [ACTIONS.GET_REPLIES]: getReplies,
  [ACTIONS.POST_REVIEW]: postReview,
  [ACTIONS.POST_REPLY]: postReply
}

export const COMMITS = {
  [ACTIONS.GET_REVIEW]: 'FOCUS_REVIEW',
  [ACTIONS.GET_REPLIES]: 'FOCUS_REPLIES',
  [ACTIONS.POST_REVIEW]: 'FOCUS_REVIEW',
  [ACTIONS.POST_REPLY]: 'FOCUS_REPLIES'
}
