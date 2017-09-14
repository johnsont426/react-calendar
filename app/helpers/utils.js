export const today = new Date()
export const todayMonthNum = today.getMonth()
export const todayYearNum = today.getFullYear()
const todayDateNum = today.getDate()
const todayDateObj = new Date(todayYearNum, todayMonthNum, todayDateNum)
export const todayDateTimeNum = todayDateObj.getTime()

export function theFirstOfThisMonth (date) {
  return new Date(date.setDate(1))
}

export function daysInThisMonth (yearNum, monthNum) {
  return new Date(yearNum, monthNum + 1, 0).getDate()
}

export function formattedMonth (num) {
  let monthArray = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  return monthArray[num]
}

export function getCorrectDate (num, daysInMonth) {
  return num > 0 && num <= daysInMonth ? num : 0
}

export function dateToNum (year, monthNum, date) {
  const d = new Date(year, monthNum, date)
  return d.getTime()
}

export function timeNumToFormattedDate (timeNum) {
  const d = new Date(timeNum)
  const option = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  return d.toLocaleDateString('en-US', option)
}

export function formatUserInfo (name, avatar, uid) {
  return {
    name,
    avatar,
    uid,
  }
}

export function updateOccupiedArray(occupiedArray, eventStartTime, eventTimeSpan, bool) {
  occupiedArray.splice(eventStartTime, eventTimeSpan)
  if (bool === true) {
    for (let i = 0; i < eventTimeSpan; i++) {
      occupiedArray.splice(eventStartTime, 0, true)
    }
  }else {
    for (let i = 0; i < eventTimeSpan; i++) {
      occupiedArray.splice(eventStartTime, 0, false)
    }
  }

  return occupiedArray
}

export function getComingDatesTimeNum () {
  let a = []
  for (let i = todayDateNum; i < todayDateNum + 5; i++) {
    a.push(dateToNum(todayYearNum, todayMonthNum, i))
  }
  return a
}

export function indexToTime (index) {
  const a = ["12 AM", "2 AM", "4 AM", "6 AM", "8 AM", "10 AM", "12 PM", "2 PM", "4 PM", "6 PM", "8 PM", "10 PM"]
  return a[index]
}