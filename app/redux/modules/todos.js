const UPDATE_FORMATTED_DATE = 'UPDATE_FORMATTED_DATE'
import { Map } from 'immutable'

export function updateFormattedDate (formattedDate) {
  return {
    type: UPDATE_FORMATTED_DATE,
    formattedDate,
  }
}

const initialState = Map({
  formattedDate: ''
})

export default function todos (state = initialState, action) {
  switch (action.type) {
    case UPDATE_FORMATTED_DATE :
      return state.merge({
        formattedDate: action.formattedDate
      })
    default :
      return state
  }
}