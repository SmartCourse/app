const express = require('express')
const path = require('path')

const ENV = process.env.NODE_ENV

// for caching
const ONE_DAY = 1000 * 60 * 60 * 24

const staticPath = path.join(__dirname, '../public')

const cacheOptions = {
    // 1d for staging, 30d for prod
    maxAge: ENV === 'development' ? ONE_DAY : ONE_DAY * 30,

    // cacheControl turned off if test env.
    cacheControl: ENV !== 'test',

    // prevents .html from being cached
    setHeaders: (res, path) => {
        if (express.static.mime.lookup(path) === 'text/html') {
            // Custom Cache-Control for HTML files
            res.setHeader('Cache-Control', 'public, max-age=0')
        }
    }
}

// TODO selected API caching

exports.staticFilesCache = express.static(staticPath, cacheOptions)
