import { getSubjects, getCourses } from '@/utils/api/subject'

export const ACTIONS = {
  GET_SUBJECTS: Symbol('getSubjects'),
  GET_COURSES: Symbol('getCourses')
}

export const REQUEST = {
  [ACTIONS.GET_SUBJECTS]: getSubjects,
  [ACTIONS.GET_COURSES]: getCourses
}

export const COMMITS = {
  [ACTIONS.GET_SUBJECTS]: 'REFRESH_SUBJECTS',
  [ACTIONS.GET_COURSES]: 'REFRESH_COURSES'
}
