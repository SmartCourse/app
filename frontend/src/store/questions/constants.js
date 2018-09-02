import {
  getQuestions,
  getQuestion,
  getAnswers
} from '@/utils/api/questions'

export const ACTIONS = {
  GET_QUESTIONS: Symbol('getQuestions'),
  GET_QUESTION: Symbol('getQuestion'),
  GET_ANSWERS: Symbol('getAnswers')
}

export const REQUEST = {
  [ACTIONS.GET_QUESTIONS]: getQuestions,
  [ACTIONS.GET_QUESTION]: getQuestion,
  [ACTIONS.GET_ANSWERS]: getAnswers
}

export const COMMITS = {
  [ACTIONS.GET_QUESTIONS]: 'REFRESH_FEED',
  [ACTIONS.GET_QUESTION]: 'FOCUS_QUESTION',
  [ACTIONS.GET_ANSWERS]: 'FOCUS_ANSWERS'
}
