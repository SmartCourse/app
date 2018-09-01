import {
  getQuestions,
  getQuestion,
  getAnswers
} from '@/utils/api/questions'

export const ACTIONS = {
  GET_FEED: Symbol('getQuestionFeed'),
  GET_QUESTION: Symbol('getQuestion'),
  GET_ANSWERS: Symbol('getAnswers')
}

export const REQUEST = {
  [ACTIONS.GET_FEED]: getQuestions,
  [ACTIONS.GET_QUESTION]: getQuestion,
  [ACTIONS.GET_ANSWERS]: getAnswers
}

export const COMMITS = {
  [ACTIONS.GET_FEED]: 'REFRESH_FEED',
  [ACTIONS.GET_QUESTION]: 'FOCUS_QUESTION',
  [ACTIONS.GET_ANSWERS]: 'FOCUS_ANSWERS'
}
