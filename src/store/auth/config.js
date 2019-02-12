import firebase from 'firebase/app'
import 'firebase/auth'

const config = {
  apiKey: 'AIzaSyANscpcUrt-ECaX8lqu3vQTtEyggcZ_7X4',
  authDomain: 'smartcourse-ec321.firebaseapp.com',
  databaseURL: 'https://smartcourse-ec321.firebaseio.com',
  projectId: 'smartcourse-ec321',
  storageBucket: 'smartcourse-ec321.appspot.com',
  messagingSenderId: '556870416458'
}

firebase.initializeApp(config)

export default firebase.auth()
