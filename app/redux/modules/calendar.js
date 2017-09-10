import { Map, fromJS, List } from 'immutable'
import { today, todayYearNum, todayMonthNum, theFirstOfThisMonth, daysInThisMonth } from 'helpers/utils'
import { fetchOccupiedDate } from 'helpers/api'

const NEXT_MONTH = 'NEXT_MONTH'
const LAST_MONTH = 'LAST_MONTH'
const UPDATE_OCCUPIED_DATES = 'UPDATE_OCCUPIED_DATES'

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

export function updateOccupiedDates (dateTimeNumArray) {
  return {
    type: UPDATE_OCCUPIED_DATES,
    dateTimeNumArray,
  }
}

export function fetchAndHandleOccupiedDate () {
  return function (dispatch, getState) {
    const uid = getState().users.get('authedId')
    fetchOccupiedDate(uid).then((response) => {
      let a = []
      for (let dateTimeNum in response) {
        a.push(dateTimeNum)
      }
      dispatch(updateOccupiedDates(a))
    })
  }
}

const initialState = fromJS({
	yearNum: todayYearNum,
  monthNum: todayMonthNum,
  dayOfTheFirst: theFirstOfThisMonth(today).getDay(),
  daysInMonth: daysInThisMonth(todayYearNum, todayMonthNum),
  occupiedDates: []
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
    case UPDATE_OCCUPIED_DATES :
      return state.merge({occupiedDates: List(action.dateTimeNumArray)})
    default :
      return state
  }
}