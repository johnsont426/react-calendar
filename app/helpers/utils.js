const today = new Date
export const theFirstOfThisMonth = new Date(today.setDate(1))
export const todayMonthNum = today.getMonth()
export const todayYearNum = today.getFullYear()
export const daysInThisMonth = new Date(todayYearNum, todayMonthNum, 0).getDate()


export function formattedMonth (num) {
  let monthArray = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  return monthArray[num]
}

export function getCorrectDate (num, daysInMonth) {
  return num > 0 && num <= daysInMonth ? num : null
}