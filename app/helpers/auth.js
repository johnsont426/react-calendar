import firebase from 'firebase'
import { firebaseAuth, ref } from 'config/constants'

export default function auth () {
  return firebaseAuth().signInWithPopup(new firebase.auth.FacebookAuthProvider())
}

export function saveUser (user) {
  return ref.child(`users/${user.uid}`)
    .set(user)
    .then(() => user)
}

export function checkIfAuthed (store) {
  return store.getState().users.get('isAuthed')
}

export function logout () {
  return firebaseAuth().signOut()
}

