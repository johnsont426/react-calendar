import { fromJS } from 'immutable'

const UPDATE_FORMATTED_DATE = 'UPDATE_FORMATTED_DATE'
const REMOVE_FORMATTED_DATE = 'REMOVE_FORMATTED_DATE'

export function updateFormattedDate (formattedDate) {
  return {
    type: UPDATE_FORMATTED_DATE,
    formattedDate,
  }
}

export function removeFormattedDate () {
  return {
    type: REMOVE_FORMATTED_DATE,
  }
}

const initialState = fromJS({
  formattedDate: '',
})

export default function schedules (state = initialState, action) {
  switch (action.type) {
    case UPDATE_FORMATTED_DATE :
      return state.merge({
        formattedDate: action.formattedDate
      })
    case REMOVE_FORMATTED_DATE :
      return initialState
    default :
      return state
  }
}