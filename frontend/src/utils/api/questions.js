import { get, post, put } from './index'
import format from 'date-fns/format'

/* get question */
export function getQuestion(id) {
  return get(`/question/${id}`)
}

export function answerMapper({ id, likes, userID, body, timestamp }) {
  return {
    id,
    body,
    likes,
    author: userID,
    published: format(timestamp, 'DD/MM/YY')
  }
}

export function questionMapper({ questionID, likes, userID, title, body, timestamp }) {
  return {
    id: questionID,
    title,
    body,
    likes,
    author: userID,
    published: format(timestamp, 'DD/MM/YY')
  }
}

// STUBS

/**
 * @param {object} data the data associated with the new question
 */
export function postQuestion(id, data) {
  return post(`/course/${id}/question`, { data })
}

export function getAnswers(id) {
  return get(`/question/${id}/answers`)
}

/**
 * @param {string} id the id of the question being answered
 * @param {object} data the data associated with the new answer
 */
export function postAnswer(id, data) {
  return post(`/question/${id}/answers`, { data })
}

/**
 * @param {string} id the id of the question being edited
 * @param {object} data the data associated with the new question
 */
export function editQuestion(id, data) {
  return put(`/question/${id}`, { data })
}
