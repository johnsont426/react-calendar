import { Map } from 'immutable'

const OPEN_MODAL = 'OPEN_MODAL'
const CLOSE_MODAL = 'CLOSE_MODAL'
const UPDATE_EVENT_TEXT = 'UPDATE_EVENT_TEXT'

export function openModal () {
  return {
    type: OPEN_MODAL,
  }
}

export function closeModal () {
  return {
    type: CLOSE_MODAL,
  }
}

export function updateEventText (eventText) {
  return {
    type: UPDATE_EVENT_TEXT,
    eventText,
  }
}

const initialState = Map({
  isOpen: false,
  eventText: "",
})

export default function modal (state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL :
      return state.merge({
        isOpen: true,
      })
    case CLOSE_MODAL :
      return state.merge({
        isOpen: false,
        eventText: '',
      })
    case UPDATE_EVENT_TEXT :
      return state.merge({
        eventText: action.eventText,
      })
    default :
      return state
  }
}