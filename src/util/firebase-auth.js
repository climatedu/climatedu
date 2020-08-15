import * as firebase from 'firebase/app'
import 'firebase/auth'

// https://climatedu-957b7.firebaseapp.com/__/firebase/init.json
firebase.initializeApp({
  apiKey: 'AIzaSyBY049RvUmDowbIygkFiJfhj17e6-XCy8o',
  authDomain: 'climatedu-957b7.firebaseapp.com',
  databaseURL: 'https://climatedu-957b7.firebaseio.com',
  messagingSenderId: '162049068533',
  projectId: 'climatedu-957b7',
  storageBucket: 'climatedu-957b7.appspot.com'
})

export default firebase.auth
