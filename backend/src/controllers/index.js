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

router.get('/', function(req, res, next) { /* eslint-disable-line */
  //res.render('index', { title: 'Express' })
  res.send(`<h1>Hello Alex</h1>
            <code>${req.special}</code>
            <p>${JSON.stringify(req.user)}</p>`)
})

module.exports = router
