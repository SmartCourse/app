/**
 * firebase SDK details can be found here:
 * https://firebase.google.com/docs/admin/setup
 */

const admin = require('firebase-admin')
const private_key_id = process.env.FIREBASE_PRIVATE_KEY_ID // eslint-disable-line
const private_key    = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'); // eslint-disable-line

const credentials = {
    type: 'service_account',
    project_id: 'smartcourse-ec321',
    private_key_id,
    private_key,
    client_email: 'firebase-adminsdk-0jlc6@smartcourse-ec321.iam.gserviceaccount.com',
    client_id: '116465021328827845182',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url: 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-0jlc6%40smartcourse-ec321.iam.gserviceaccount.com'
}

const firebase = admin.initializeApp({
    credential: admin.credential.cert(credentials),
    databaseURL: 'https://smartcourse-ec321.firebaseio.com'
})

module.exports = firebase.auth()
