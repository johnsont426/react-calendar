import { fromJS } from 'immutable'

const UPDATE_FORMATTED_DATE = 'UPDATE_FORMATTED_DATE'

export function updateFormattedDate (formattedDate) {
  return {
    type: UPDATE_FORMATTED_DATE,
    formattedDate,
  }
}

const initialState = fromJS({
  formattedDate: '',
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