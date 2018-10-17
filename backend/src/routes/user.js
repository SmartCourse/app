const express = require('express')
const router = express.Router()
const { isAuthorized, isFirebaseAuthorized } = require('../utils/helpers')
const { getSelf, getUser, createUser, updateUser } = require('../controllers/user')

/* Get public data for a specific user */
router.get('/:id', getUser)

/* no valid jwt then don't allow user to be created */
router.use(isFirebaseAuthorized)
router.post('/', createUser)

/* full auth check */
router.use(isAuthorized)

/* provide frontend with any user specific data */
router.get('/', getSelf)
router.put('/', updateUser)

module.exports = router
