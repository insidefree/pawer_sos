import * as firebase from 'firebase'
// const serviceAccount = require('./serviceAccountKey.json')


const firebaseConfig = {
  apiKey: "AIzaSyDHKja4zGoInK7D5PsL4MCHAYC2lmvGGPA",
  authDomain: "anish-6cd8e.firebaseapp.com",
  databaseURL: "https://anish-6cd8e.firebaseio.com",
  projectId: "anish-6cd8e",
  storageBucket: "anish-6cd8e.appspot.com",
  messagingSenderId: "613075498242"
}

export const firebaseApp = firebase.initializeApp(firebaseConfig)
export const fbAcidents = firebaseApp.database().ref('acidents')
export const storageRef = firebaseApp.storage()


