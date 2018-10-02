import {
  getQuestion,
  postQuestion,
  putQuestion,
  getAnswers,
  postAnswer
} from '@/utils/api/questions'
import { editQuestion } from '../../utils/api/questions';

export const ACTIONS = {
  GET_QUESTION: Symbol('getQuestion'),
  POST_QUESTION: Symbol('postQuestion'),
  PUT_QUESTION: Symbol('putQuestion'),
  GET_ANSWERS: Symbol('getAnswers'),
  POST_ANSWER: Symbol('postAnswer')
}

export const REQUEST = {
  [ACTIONS.GET_QUESTION]: getQuestion,
  [ACTIONS.POST_QUESTION]: postQuestion,
  [ACTIONS.PUT_QUESTION]: editQuestion,
  [ACTIONS.GET_ANSWERS]: getAnswers,
  [ACTIONS.POST_ANSWER]: postAnswer
}

export const COMMITS = {
  [ACTIONS.GET_QUESTION]: 'FOCUS_QUESTION',
  [ACTIONS.POST_QUESTION]: 'FOCUS_QUESTION',
  [ACTIONS.PUT_QUESTION]: 'FOCUS_QUESTION',
  [ACTIONS.GET_ANSWERS]: 'FOCUS_ANSWERS',
  [ACTIONS.POST_ANSWER]: 'APPEND_ANSWER'
}
