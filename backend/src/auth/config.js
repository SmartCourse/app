/**
 * firebase SDK details can be found here:
 * https://firebase.google.com/docs/admin/setup
 */

const admin = require('firebase-admin')

// todo fix the || case
const credentials = require('./config.json') || {}

const firebase = admin.initializeApp({
    credential: admin.credential.cert(credentials),
    databaseURL: 'https://smartcourse-ec321.firebaseio.com'
})

module.exports = firebase.auth()
