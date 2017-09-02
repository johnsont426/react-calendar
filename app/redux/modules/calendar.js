import { Map } from 'immutable'
import { today, todayYearNum, todayMonthNum, theFirstOfThisMonth, daysInThisMonth } from 'helpers/utils'

const NEXT_MONTH = 'NEXT_MONTH'
const LAST_MONTH = 'LAST_MONTH'

export function nextMonth () {
  return {
    type: NEXT_MONTH
  }
}

export function lastMonth () {
  return {
    type: LAST_MONTH
  }
}

const initialState = Map({
	yearNum: todayYearNum,
  monthNum: todayMonthNum,
  dayOfTheFirst: theFirstOfThisMonth(today).getDay(),
  daysInMonth: daysInThisMonth(todayYearNum, todayMonthNum)
})

export default function months (state = initialState, action) {
  switch (action.type) {
    case NEXT_MONTH :
      let nextMonthNum = state.get('monthNum') === 11 ? 0 : state.get('monthNum') + 1
      let theYearNum = state.get('monthNum') === 11 ? state.get('yearNum') + 1 : state.get('yearNum')
      return state.merge({
        monthNum: nextMonthNum,
        yearNum: theYearNum,
        dayOfTheFirst: theFirstOfThisMonth(new Date(theYearNum, nextMonthNum)).getDay(),
        daysInMonth: daysInThisMonth(theYearNum, nextMonthNum)
      })
    case LAST_MONTH :
      let lastMonthNum = state.get('monthNum') === 0 ? 11 : state.get('monthNum') - 1
      theYearNum = state.get('monthNum') === 0 ? state.get('yearNum') - 1 : state.get('yearNum')
      return state.merge({
        monthNum: lastMonthNum,
        yearNum: theYearNum,
        dayOfTheFirst: theFirstOfThisMonth(new Date(theYearNum, lastMonthNum)).getDay(),
        daysInMonth: daysInThisMonth(theYearNum, lastMonthNum)
      })
    default :
      return state
  }
}