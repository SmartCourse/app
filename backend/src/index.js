const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const firebase = require('./auth')
const db = require('./models/db')
const compression = require('compression')
const app = express()

// for json parsing
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// for gzipping
app.use(compression())

// for caching
app.use(express.static(path.join(__dirname, '../public'), {
    maxAge: '30d'
}))

// for auth tokens
app.use(firebase)

// for setting cors headers
const { corsDev, corsProd } = require('./utils/cors')

if (app.get('env') === 'development') {
    app.use(logger('dev'))
    app.use(corsDev)
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

/*
 * Connect to SQL server
 */
db.init()
    .then(() => console.log('App ready!'))
    .then(() => app.emit('ready'))

module.exports = app
