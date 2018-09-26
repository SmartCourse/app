import { get } from './index'

/**
 * Get all questions relevant to a course
 */
export function getSubjects() {
  return get('/subject')
}

/**
 * Get all reviews relevant to a course
 */
export function getCourses(subjCode) {
  return get(`/subject/${subjCode}`)
}

export function subjectMapper({ code, name, handbookURL }) {
  return {
    code,
    name,
    handbookURL
  }
}
