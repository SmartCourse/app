const express = require('express')
const api = express.Router()

/** childroutes */
const userRouter = require('./user')
const uniRouter = require('./uni')
const courseRouter = require('./course')
const subjectRouter = require('./subject')

api.use('/user', userRouter)
api.use('/uni', uniRouter)
api.use('/course', courseRouter)
api.use('/subject', subjectRouter)

/* Root API for debugging */
api.get('/', function (req, res) {
    res.send('<h1>Welcome to the API</h1>')
})

api.use('*', function (_, res) {
    res.sendStatus(404)
})

module.exports = api
