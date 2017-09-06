export const today = new Date
export const todayMonthNum = today.getMonth()
export const todayYearNum = today.getFullYear()

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
  const option = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }
  return d.toLocaleDateString('en-US', option)
}

export function formatUserInfo (name, avatar, uid) {
  return {
    name,
    avatar,
    uid,
  }
}