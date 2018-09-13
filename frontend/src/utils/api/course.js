import { get } from './index'

/**
 * Get all questions relevant to a course
 */
export function getQuestions(course = 1) {
  return get(`/course/${course}/questions`)
}

/**
 * Get all reviews relevant to a course
 */
export function getReviews(course = 1) {
  return get(`/course/${course}/reviews`)
}

/**
 * Get course info
 */
export function getCourse(course = 1) {
  return get(`/course/${course}`)
}

export function courseMapper({courseID, code, name, rating}) {
  return {
    id: courseID,
    code,
    name,
    rating
  }
}
