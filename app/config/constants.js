import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyAlcS_2uiUaWAezB0BjhHkQeh8mBiE1nPQ",
  authDomain: "my-calendar-fdaa3.firebaseapp.com",
  databaseURL: "https://my-calendar-fdaa3.firebaseio.com",
  projectId: "my-calendar-fdaa3",
  storageBucket: "my-calendar-fdaa3.appspot.com",
  messagingSenderId: "14318372494"
}

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth