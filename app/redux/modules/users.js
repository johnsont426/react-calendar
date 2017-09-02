import { fromJS, Map } from 'immutable'

function authUser (uid) {
  return {
    type: AUTH_USER,
    uid,
  }
}

function unauthUser () {
  return {
    type: UNAUTH_USER,
  }
}

const initialState = Map({
  isFetching: true,
  error: '',
  isAuthed: false,
  authedId: '',
})

export default function users (state = initialState, action) {
  return state
}