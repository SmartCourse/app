import {
  getQuestion,
  postQuestion,
  deleteQuestion,
  deleteAnswer,
  editQuestion,
  editAnswer,
  getAnswers,
  postAnswer,
  getLikes,
  putLikes,
  getAnswerLikes,
  putAnswerLikes
} from '@/utils/api/questions'

export const ACTIONS = {
  GET_QUESTION: Symbol('getQuestion'),
  POST_QUESTION: Symbol('postQuestion'),
  DELETE_QUESTION: Symbol('deleteQuestion'),
  DELETE_ANSWERS: Symbol('deleteAnswers'),
  EDIT_QUESTION: Symbol('editQuestion'),
  EDIT_ANSWERS: Symbol('editAnswers'),
  GET_ANSWERS: Symbol('getAnswers'),
  POST_ANSWER: Symbol('postAnswer'),
  GET_LIKES: Symbol('getLikes'),
  PUT_LIKES: Symbol('putLikes'),
  GET_ANSWER_LIKES: Symbol('getAnswerLikes'),
  PUT_ANSWER_LIKES: Symbol('putAnswerLikes')
}

export const REQUEST = {
  [ACTIONS.GET_QUESTION]: getQuestion,
  [ACTIONS.POST_QUESTION]: postQuestion,
  [ACTIONS.DELETE_QUESTION]: deleteQuestion,
  [ACTIONS.DELETE_ANSWER]: deleteAnswer,
  [ACTIONS.EDIT_QUESTION]: editQuestion,
  [ACTIONS.EDIT_ANSWER]: editAnswer,
  [ACTIONS.GET_ANSWERS]: getAnswers,
  [ACTIONS.POST_ANSWER]: postAnswer,
  [ACTIONS.GET_LIKES]: getLikes,
  [ACTIONS.PUT_LIKES]: putLikes,
  [ACTIONS.GET_ANSWER_LIKES]: getAnswerLikes,
  [ACTIONS.PUT_ANSWER_LIKES]: putAnswerLikes
}

export const COMMITS = {
  [ACTIONS.GET_QUESTION]: 'FOCUS_QUESTION',
  [ACTIONS.POST_QUESTION]: 'SET_QUESTION',
  [ACTIONS.DELETE_QUESTION]: '', // TODO ?
  [ACTIONS.DELETE_ANSWER]: '', // TODO
  [ACTIONS.EDIT_QUESTION]: 'FOCUS_QUESTION',
  [ACTIONS.EDIT_ANSWER]: '', // TODO
  [ACTIONS.GET_ANSWERS]: 'FOCUS_ANSWERS',
  [ACTIONS.POST_ANSWER]: 'APPEND_ANSWER',
  [ACTIONS.GET_LIKES]: 'FOCUS_LIKES',
  [ACTIONS.PUT_LIKES]: 'FOCUS_QUESTION',
  [ACTIONS.GET_ANSWER_LIKES]: 'FOCUS_ANSWERS',
  [ACTIONS.PUT_ANSWER_LIKES]: 'FOCUS_ANSWERS'
}
