import { get } from './index'

/**
 * Get all questions relevant to a course
 */
export function getQuestions(course, pageNumber) {
  return get(`/course/${course}/questions?p=${pageNumber}`)
}

/**
 * Get all reviews relevant to a course
 */
export function getReviews(course, pageNumber) {
  return get(`/course/${course}/reviews?p=${pageNumber}`)
}

/**
 * Get course info
 */
export function getCourse(course) {
  return get(`/course/${course}`)
}

export function courseMapper({
  code,
  name,
  studyLevel,
  subjectCode,
  handbookURL,
  outlineURL,
  recommend,
  enjoy,
  difficulty,
  teaching,
  workload,
  description,
  requirements,
  tags
}) {
  return {
    code,
    name,
    studyLevel,
    subjectCode,
    handbookURL,
    outlineURL,
    recommend,
    enjoy,
    difficulty,
    teaching,
    workload,
    description,
    requirements,
    tags
  }
}
