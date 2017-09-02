import { Map } from 'immutable'

const UPDATE_DATE = 'UPDATE_DATE'

export function updateDate (timeNum) {
  return {
    type: UPDATE_DATE,
    timeNum,
  }
}

const initialState = Map({
  timeNumOfTheDay: 0,
})

export default function days (state = initialState, action) {
  switch (action.type) {
    case UPDATE_DATE :
      return state.merge({
        timeNumOfTheDay: action.timeNum
      })
    default :
      return state
  }
}