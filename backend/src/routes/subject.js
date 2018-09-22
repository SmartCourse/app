const express = require('express')
const subject = express.Router()
const subjectController = require('../controllers/subject')

/* Return all courses in the database */
subject.get('/', subjectController.getSubjects)

/* Get the subject data for a specific subject code */
subject.get('/:code', subjectController.getCourses)

module.exports = subject
