const express = require('express')
const router = express.Router()
const { isLoggedIn, hasFirebaseToken } = require('../utils/helpers')
const { getSelf, getUser, createUser, updateUser } = require('../controllers/user')
const { getQuestionsByUserId } = require('../controllers/question')

/* Get public data for a specific user */
router.get('/:id', getUser)
router.get('/:id/questions', getQuestionsByUserId)

/* no valid jwt then don't allow user to be created */
router.use(hasFirebaseToken)
router.post('/', createUser)

/* full auth check */
router.use(isLoggedIn)

/* provide frontend with any user specific data */
router.get('/', getSelf)

/* update user profile */
router.put('/', updateUser)

module.exports = router
