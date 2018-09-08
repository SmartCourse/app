import { get, post, put } from './index'
import format from 'date-fns/format'

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

export function courseMapper({courseID, courseCode, courseName, rating}) {
  return {
    id: courseID,
    code: courseCode,
    name: courseName,
    rating
  }
}
