const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const firebase = require('./auth')
const compression = require('compression')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(compression())
app.use(express.static(path.join(__dirname, '../public')))
app.use(firebase)

const { cors, corsProd } = require('./utils/cors')

if (app.get('env') === 'development') {
    app.use(logger('dev'))
    app.use(cors)
} else {
    app.use(corsProd)
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
