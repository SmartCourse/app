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
<<<<<<< HEAD
    joined: format(joined * 1000, 'dd/MM/yyyy')
=======
    joined: format(joined, 'dd/MM/yyyy')
>>>>>>> 6067b0b906da55869d3c6fddd9503dce430ca5a7
  }
}
