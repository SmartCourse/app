const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('*', function(req, res, next) {
  req.special = JSON.stringify(req.query)
  req.user = {
    name: 'jeff',
    age: 20
  }
  next()
})

module.exports = router
