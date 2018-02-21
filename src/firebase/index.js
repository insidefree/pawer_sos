import * as firebase from 'firebase'
const admin = require('firebase-admin')
const serviceAccount = require('./serviceAccountKey.json')


const firebaseConfig = {
  apiKey: "AIzaSyDHKja4zGoInK7D5PsL4MCHAYC2lmvGGPA",
  authDomain: "anish-6cd8e.firebaseapp.com",
  databaseURL: "https://anish-6cd8e.firebaseio.com",
  projectId: "anish-6cd8e",
  storageBucket: "anish-6cd8e.appspot.com",
  messagingSenderId: "613075498242"
}

export const firebaseApp = firebase.initializeApp(firebaseConfig)

export const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://anish-6cd8e.firebaseio.com'
})

