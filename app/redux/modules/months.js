import { Map } from 'immutable'
import { todayYearNum, todayMonthNum, theFirstOfThisMonth, daysInThisMonth } from 'helpers/utils'

const UPDATE_MONTH = 'UPDATE_MONTH'

function updateMonth () {
  return {
    type: UPDATE_MONTH
  }
}

const initialState = {
	yearNum: todayYearNum,
  monthNum: todayMonthNum,
  dayOfTheFirst: theFirstOfThisMonth.getDay(),
  daysInMonth: daysInThisMonth
}

export default function months (state = initialState, action) {
  return state
}