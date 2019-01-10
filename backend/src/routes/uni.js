const express = require('express')
const uni = express.Router()
const uniController = require('../controllers/uni')

const { cacheResponse } = require('../utils/helpers')

/* This doesn't change much */
uni.use(cacheResponse)

/* Return all faculties in the database */
uni.get('/faculties', uniController.getFaculties)

/* Return all degrees in the database */
uni.get('/degrees', uniController.getDegrees)

/* Return all degrees in the database */
uni.get('/sessions', uniController.getSessions)

module.exports = uni
