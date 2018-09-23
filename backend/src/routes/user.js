const express = require('express')
const router = express.Router()
const { isAuthorized } = require('../utils/helpers')
const { getSelf, getUser, createUser } = require('../controllers/user')

/* Get data for a specific user */
router.get('/:id', getUser)

/* no valid jwt then don't allow user to be created */
router.use(isAuthorized)

/**
 * Both of these require an authorization header
 * provide frontend with any user specific data
 */
router.get('/', getSelf)

router.post('/', createUser)

module.exports = router
