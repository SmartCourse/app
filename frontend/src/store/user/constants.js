import { getUser } from '@/utils/api/user'

export const ACTIONS = {
  GET_USER: Symbol('getUser')
}

export const REQUEST = {
  [ACTIONS.GET_USER]: getUser
}

export const COMMITS = {
  [ACTIONS.GET_USER]: 'REFRESH_USER'
}
