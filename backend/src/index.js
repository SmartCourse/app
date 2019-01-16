const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const firebase = require('./auth')
const compression = require('compression')
const db = require('./models/db')
const PRE_RENDERED_TEMPLATES = require('../pre-rendered')
const { APIErrorHandler } = require('./utils/error')

const app = express()
const ENV = app.get('env')

// for json parsing
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// for gzipping
app.use(compression())

// for caching
app.use(express.static(path.join(__dirname, '../public'), {
    maxAge: ENV === 'development' ? '1d' : '30d'
}))

// for auth tokens
app.use(firebase)

// for setting cors headers
const { corsDev, corsProd } = require('./utils/cors')

if (ENV === 'test') {
    app.use(logger('dev'))
}

if (ENV === 'production') {
    app.use(corsProd)
} else {
    app.use(corsDev)
}

const apiRouter = require('./routes')

app.use('/api', apiRouter)

/*
 * These templates are prerendered to enchance SEO.
 * If requests are returned for these rotues, return the template.
 */
PRE_RENDERED_TEMPLATES
    .forEach(route => {
        app.use(`${route}`, function (_, res) {
            res.sendFile(path.join(__dirname, `../public${route}`, 'index.html'))
        })
    })

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
db.init()
    .then(() => console.log('App ready!'))
    .then(() => app.emit('ready'))

module.exports = app
