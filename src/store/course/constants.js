import { getQuestions, getReviews, getCourse } from '@/utils/api/course'

export const ACTIONS = {
  GET_QUESTIONS: Symbol('getQuestions'),
  GET_REVIEWS: Symbol('getReviews'),
  GET_COURSE: Symbol('getCourse')
}

export const REQUEST = {
  [ACTIONS.GET_QUESTIONS]: getQuestions,
  [ACTIONS.GET_REVIEWS]: getReviews,
  [ACTIONS.GET_COURSE]: getCourse
}

export const COMMITS = {
  [ACTIONS.GET_QUESTIONS]: 'REFRESH_QUESTION_FEED',
  [ACTIONS.GET_REVIEWS]: 'REFRESH_REVIEW_FEED',
  [ACTIONS.GET_COURSE]: 'FOCUS_COURSE'
}
