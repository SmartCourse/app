const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const firebase = require('./auth')
const compression = require('compression')
const db = require('./models/db')
const { APIErrorHandler } = require('./error')
const { staticFilesCache } = require('./utils/cache')
const { PRODUCTION } = require('./models/constants')

const app = express()

// for json parsing
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// for gzipping
app.use(compression())

// for auth tokens
app.use(firebase)

// for setting cors headers
const { corsDev, corsProd } = require('./utils/cors')

if (process.env.LOG) {
    app.use(logger('dev'))
}

if (PRODUCTION) {
    app.use(corsProd)
} else {
    app.use(corsDev)
}

const apiRouter = require('./routes')

app.use('/api', apiRouter)

// for caching
app.use(staticFilesCache)

/*
    anything that gets here and not handled
    by api error handler should get index.html.
    NB: frontend must handle actual 404s.
*/
app.use('*', function (_, res) {
    res.sendFile(path.join(__dirname, '../public', 'index.html'))
})

app.use(APIErrorHandler)

/*
 * Connect to SQL server
 */
db.on('ready', () => {
    console.log('App ready!')
    app.emit('ready')
})

module.exports = app
