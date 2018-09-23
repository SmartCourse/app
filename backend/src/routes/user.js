const express = require('express')
const router = express.Router()
const { getSelf, getUser, createUser } = require('../controllers/user')

/* Get data for a specific user */
router.get('/:id', getUser)

/**
 * TODO
 * provide frontend with any user specific data
 */
router.get('/', getSelf)

router.post('/', createUser)

module.exports = router
