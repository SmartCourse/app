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

/**
 * TODO
 * provide frontend with any user specific data deemed necessary for intialisation
 */
router.get('/', function (req, res) {
    res.json({
        auth: !!req.user // for the time being shorthand for saying is user auth'd
    })
})

module.exports = router
