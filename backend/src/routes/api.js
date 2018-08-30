const express = require('express')
const router = express.Router()

const userRouter = require('./user')
const uniRouter = require('./uni')
const courseRouter = require('./course')

router.use('/user', userRouter)
router.use('/uni', uniRouter)
router.use('/course/:cid', courseRouter)

/* Root API for debugging */
router.get('/', function (req, res) {
    res.send('<h1>Welcome to the API</h1>')
})

router.use('*', function (_, res) {
    res.sendStatus(404)
})

module.exports = router
