import {
  getReview,
  getReplies,
  postReview,
  postReply,
  getLikes,
  putLikes,
  getReplyLikes,
  putReplyLikes
} from '@/utils/api/reviews'

export const ACTIONS = {
  GET_REVIEW: Symbol('getReview'),
  GET_REPLIES: Symbol('getReplies'),
  POST_REVIEW: Symbol('postReview'),
  POST_REPLY: Symbol('postReply'),
  GET_LIKES: Symbol('getLikes'),
  PUT_LIKES: Symbol('putLikes'),
  GET_REPLY_LIKES: Symbol('getReplyLikes'),
  PUT_REPLY_LIKES: Symbol('putReplyLikes')
}

export const REQUEST = {
  [ACTIONS.GET_REVIEW]: getReview,
  [ACTIONS.GET_REPLIES]: getReplies,
  [ACTIONS.POST_REVIEW]: postReview,
  [ACTIONS.POST_REPLY]: postReply,
  [ACTIONS.GET_LIKES]: getLikes,
  [ACTIONS.PUT_LIKES]: putLikes,
  [ACTIONS.GET_REPLY_LIKES]: getReplyLikes,
  [ACTIONS.PUT_REPLY_LIKES]: putReplyLikes
}

export const COMMITS = {
  [ACTIONS.GET_REVIEW]: 'FOCUS_REVIEW',
  [ACTIONS.GET_REPLIES]: 'FOCUS_REPLIES',
  [ACTIONS.POST_REVIEW]: 'SET_REVIEW',
  [ACTIONS.POST_REPLY]: 'APPEND_REPLY',
  [ACTIONS.GET_LIKES]: 'FOCUS_LIKES',
  [ACTIONS.PUT_LIKES]: 'FOCUS_REVIEW',
  [ACTIONS.GET_REPLY_LIKES]: 'FOCUS_REPLIES',
  [ACTIONS.PUT_REPLY_LIKES]: 'FOCUS_REPLIES'
}
