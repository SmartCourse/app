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
  if (!joined) {
    return
  }

  return {
    ...rest,
    joined: format(new Date(joined), 'dd/MM/yyyy')
  }
}
