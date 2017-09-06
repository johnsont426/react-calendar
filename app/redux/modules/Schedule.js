const UPDATE_FORMATTED_DATE = 'UPDATE_FORMATTED_DATE'
import { fromJS } from 'immutable'

export function updateFormattedDate (formattedDate) {
  return {
    type: UPDATE_FORMATTED_DATE,
    formattedDate,
  }
}

const initialState = fromJS({
  formattedDate: '',
  events: ["", "", "", "", "", "", "", "", "", "", "", ""]
})

export default function schedule (state = initialState, action) {
  switch (action.type) {
    case UPDATE_FORMATTED_DATE :
      return state.merge({
        formattedDate: action.formattedDate
      })
    default :
      return state
  }
}