import { get } from './index'

/**
 * Get all questions relevant to a course
 */
export function getQuestions(course) {
  return get(`/course/${course}/questions`)
}

/**
 * Get all reviews relevant to a course
 */
export function getReviews(course) {
  return get(`/course/${course}/reviews`)
}

/**
 * Get course info
 */
export function getCourse(course) {
  return get(`/course/${course}`)
}

export function courseMapper({code, name, studyLevel, subjectCode, handbookURL, outlineURL, rating, description, requirements, tags}) {
  return {
    code,
    name,
    studyLevel,
    subjectCode,
    handbookURL,
    outlineURL,
    rating,
    description,
    requirements,
    tags
  }
}
