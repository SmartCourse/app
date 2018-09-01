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
if (app.get('env') === 'development') {
    app.use(function (_, res, next) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        next()
    })
}

const apiRouter = require('./routes')

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
