import { get } from './index'

/**
 * Get all questions relevant to a course
 */
export function getQuestions(course = 'COMP4920') {
  return get(`/course/${course}/questions`)
}

/**
 * Get all reviews relevant to a course
 */
export function getReviews(course = 'COMP4920') {
  return get(`/course/${course}/reviews`)
}

/**
 * Get course info
 */
export function getCourse(course = 'COMP4920') {
  return get(`/course/${course}`)
}

export function courseMapper({code, name, rating, description}) {
  return {
    code,
    name,
    rating,
    description
  }
}
