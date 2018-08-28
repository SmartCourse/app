const express = require('express')
const router = express.Router()
  
/* Get data for a specific university */
router.get('/:id', function(req, res) {

    uid = req.params.id;

    res.send('<h1>Welcome to the API</h1>')
})

module.exports = router