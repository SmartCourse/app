const express = require('express')
const subject = express.Router()
const uniController = require('../controllers/uni')

/* Return all courses in the database */
subject.get('/', uniController.getSubjects)

/* Get the subject data for a specific subject code */
subject.get('/:code', uniController.getCourses)

module.exports = subject
