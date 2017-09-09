import { ref } from 'config/constants'

export function saveEvent (uid, dateTimeNum, eventStartTime, eventTimeSpan, eventText) {
  return ref.child(`usersEvents/${uid}/${dateTimeNum}/${eventStartTime}`).set({eventTimeSpan, eventText})
}

export function saveOccupiedDate (uid, dateTimeNum) {
  return ref.child(`usersOccupiedDate/${uid}/${dateTimeNum}`).set(true)
}

export function fetchEvents (uid, dateTimeNum) {
  return ref.child(`usersEvents/${uid}/${dateTimeNum}`).once('value')
    .then((snapshot) =>  snapshot.val())
}