const express = require('express')
const degrees = express.Router()
const uniController = require('../controllers/uni')

/* Return all degrees in the database */
degrees.get('/', uniController.getDegrees)

module.exports = degrees
