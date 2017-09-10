import { Map, fromJS, List } from 'immutable'
import { today, todayYearNum, todayMonthNum, theFirstOfThisMonth, daysInThisMonth } from 'helpers/utils'
import { fetchOccupiedDate } from 'helpers/api'

const NEXT_MONTH = 'NEXT_MONTH'
const LAST_MONTH = 'LAST_MONTH'
const ADD_OCCUPIED_DATES = 'ADD_OCCUPIED_DATES'

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

export function addOccupiedDates(dateTimeNumArray) {
  return {
    type: ADD_OCCUPIED_DATES,
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
      dispatch(addOccupiedDates(a))
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
    case ADD_OCCUPIED_DATES :
      const a = state.get('occupiedDates').toJS()
      action.dateTimeNumArray.map((dateTimeNum) => {
        a.push(dateTimeNum)
      })
      return state.merge({occupiedDates: List(a)})
    default :
      return state
  }
}