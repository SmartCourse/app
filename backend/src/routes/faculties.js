const express = require('express')
const faculties = express.Router()
const uniController = require('../controllers/uni')

/* Return all faculties in the database */
faculties.get('/', uniController.getFaculties)

module.exports = faculties
