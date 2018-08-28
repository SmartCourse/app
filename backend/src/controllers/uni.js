const express = require('express')
const router = express.Router()

/* Get ALL universtiies */
router.get('/', function(req, res) {
    res.send('<h1>Welcome to the API</h1>')
})
  
/* Get data for a specific university */
router.get('/:id', function(req, res) {

    //let uid = req.params.id;

    res.send('<h1></h1>')
})

module.exports = router