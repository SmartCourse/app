/**
 * firebase SDK details can be found here:
 * https://firebase.google.com/docs/admin/setup
 */

const admin = require('firebase-admin')

const credentials = ('./config.json')

admin.initializeApp({
    credential: admin.credential.cert(credentials),
    databaseURL: 'https://smartcourse-ec321.firebaseio.com'
})
