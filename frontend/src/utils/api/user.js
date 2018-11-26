import { get } from './index'
import format from 'date-fns/format'

/* get user's public profile */
export function getUser(id) {
  return get(`/user/${id}`)
}

export function getUserQuestions(id) {
  return get(`/user/${id}/questions`)
}

export function userMapper({
  joined,
  ...rest
}) {
  return {
    ...rest,
    joined: format(joined * 1000, 'dd/MM/yyyy')
  }
}
