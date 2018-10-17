import { get } from './index'

/* get user's public profile */
export function getUser(id) {
  return get(`/user/${id}`)
}
