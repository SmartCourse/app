
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const app = express()

if (app.get('env') !== 'test') app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../public')))

const apiRouter = require('./routes/api')

app.use('/api', apiRouter)

/*
    anything that gets here and not handled
    by api error handler should get index.html.
    NB: frontend must handle actual 404s.
*/
app.use('*', function (_, res) {
    res.sendFile(path.join(__dirname, '../public', 'index.html'))
})

module.exports = app
