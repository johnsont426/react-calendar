import { ref } from 'config/constants'
import { getComingDatesTimeNum } from 'helpers/utils'

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

export function fetchComingEvents (uid) {
  const a = getComingDatesTimeNum()
  const dayOne = a[0]
  const dayTwo = a[1]
  const dayThree = a[2]
  const dayFour = a[3]
  const dayFive = a[4]

  return Promise.all([
    ref.child(`usersEvents/${uid}/${dayOne}`).once('value'),
    ref.child(`usersEvents/${uid}/${dayTwo}`).once('value'),
    ref.child(`usersEvents/${uid}/${dayThree}`).once('value'),
    ref.child(`usersEvents/${uid}/${dayFour}`).once('value'),
    ref.child(`usersEvents/${uid}/${dayFive}`).once('value')
  ]).then((response) => {
    var eventsArray = []
    response.map((snapshot, index) => {
      if (snapshot.val()) {
        eventsArray.push({[a[index]]: snapshot.val()})
      }
    })
    return eventsArray
  })
}

export function deleteEvent (uid, dateTimeNum, eventStartTime) {
  return ref.child(`usersEvents/${uid}/${dateTimeNum}/${eventStartTime}`).remove().then(() => {
    fetchEvents(uid, dateTimeNum).then((response) => {
      if (!response) {
        ref.child(`usersOccupiedDate/${uid}/${dateTimeNum}`).remove()
      }
    })
  })
}

export function fetchOccupiedDate (uid) {
  return ref.child(`usersOccupiedDate/${uid}`).once('value')
    .then((snapshot) => snapshot.val())
}