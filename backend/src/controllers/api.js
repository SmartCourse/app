const express = require('express')
const router = express.Router()
const questions = require('../../fake_api/questions')

/* Root API for debugging */
router.get('/', function(req, res) {
  res.send('<h1>Welcome to the API</h1>')
})

/* GET questions listing. */
router.get('/questions', function(req, res) {
  res.json(questions)
})

module.exports = router