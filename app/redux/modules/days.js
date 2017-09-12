import { Map } from 'immutable'

const UPDATE_DATE = 'UPDATE_DATE'
const REMOVE_DATE = 'REMOVE_DATE'

export function updateDate (dateTimeNum) {
  return {
    type: UPDATE_DATE,
    dateTimeNum,
  }
}

export function removeDate () {
  return {
    type: REMOVE_DATE
  }
}

const initialState = Map({
  dateTimeNum: null,
})

export default function days (state = initialState, action) {
  switch (action.type) {
    case UPDATE_DATE :
      return state.merge({
        dateTimeNum: action.dateTimeNum
      })
    case REMOVE_DATE :
      return initialState
    default :
      return state
  }
}