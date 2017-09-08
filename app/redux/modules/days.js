import { Map } from 'immutable'

const UPDATE_DATE = 'UPDATE_DATE'

export function updateDate (dateTimeNum) {
  return {
    type: UPDATE_DATE,
    dateTimeNum,
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
    default :
      return state
  }
}