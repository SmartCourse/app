import { getUser, getUserQuestions } from '@/utils/api/user'

export const ACTIONS = {
  GET_USER: Symbol('getUser'),
  GET_USER_QUESTIONS: Symbol('getUserQuestions')
}

export const REQUEST = {
  [ACTIONS.GET_USER]: getUser,
  [ACTIONS.GET_USER_QUESTIONS]: getUserQuestions
}

export const COMMITS = {
  [ACTIONS.GET_USER]: 'REFRESH_USER',
  [ACTIONS.GET_USER_QUESTIONS]: 'REFRESH_QUESTIONS'
}
