const express = require('express')
const path = require('path')
const router = express.Router()

/* Root API for debugging */
router.get('/', function(req, res) {
  res.send('<h1>Welcome to the API</h1>')
})

/* GET questions listing. */
router.get('/_questions', function(req, res) {
  res.sendFile(path.join(__dirname, '../../public/_questions'))
})

module.exports = router