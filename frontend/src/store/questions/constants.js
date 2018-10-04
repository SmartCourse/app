import {
  getQuestion,
  postQuestion,
  getAnswers,
  postAnswer,
  getLikes,
  putLikes
} from '@/utils/api/questions'

export const ACTIONS = {
  GET_QUESTION: Symbol('getQuestion'),
  POST_QUESTION: Symbol('postQuestion'),
  GET_ANSWERS: Symbol('getAnswers'),
  POST_ANSWER: Symbol('postAnswer'),
  GET_LIKES: Symbol('getLikes'),
  PUT_LIKES: Symbol('putLikes')
}

export const REQUEST = {
  [ACTIONS.GET_QUESTION]: getQuestion,
  [ACTIONS.POST_QUESTION]: postQuestion,
  [ACTIONS.GET_ANSWERS]: getAnswers,
  [ACTIONS.POST_ANSWER]: postAnswer,
  [ACTIONS.GET_LIKES]: getLikes,
  [ACTIONS.PUT_LIKES]: putLikes
}

export const COMMITS = {
  [ACTIONS.GET_QUESTION]: 'FOCUS_QUESTION',
  [ACTIONS.POST_QUESTION]: 'FOCUS_QUESTION',
  [ACTIONS.GET_ANSWERS]: 'FOCUS_ANSWERS',
  [ACTIONS.POST_ANSWER]: 'APPEND_ANSWER',
  [ACTIONS.GET_LIKES]: 'FOCUS_LIKES',
  [ACTIONS.PUT_LIKES]: 'FOCUS_LIKES'
}
