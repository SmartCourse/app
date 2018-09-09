const express = require('express')
const router = express.Router()

/* Get data for a specific user */
router.get('/:id', function (_, res) {
    res.json({
        userID: 1,
        firstName: 'Walker',
        lastName: 'Francis',
        email: 'alnuno-das-hinds@gmail.com'
    })
})

module.exports = router
