import { Map, fromJS, List } from 'immutable'
import { closeModal } from './modal'

const FETCHING_EVENTS = 'FETCHING_EVENTS'
const ADD_EVENT = 'ADD_EVENT'
const UPDATE_EVENT_START_TIME = 'UPDATE_EVENT_START_TIME'
const UPDATE_EVENT_TIME_SPAN = 'UPDATE_EVENT_TIME_SPAN'
const UPDATE_OCCUPIED = 'UPDATE_OCCUPIED'
const ADD_EVENT_ERROR = 'ADD_EVENT_ERROR'
const REMOVE_ADD_EVENT_ERROR = 'REMOVE_ADD_EVENT_ERROR'

export function fetchingEvents () {
  return {
    type: FETCHING_EVENTS,
  }
}

export function updateEventStartTime (num) {
  return {
    type: UPDATE_EVENT_START_TIME,
    num,
  }
}

export function updateEventTimeSpan (num) {
  return {
    type: UPDATE_EVENT_TIME_SPAN,
    num,
  }
}

export function addEvent (eventText, startTime, timeSpan) {
  return {
    type: ADD_EVENT,
    eventText,
    startTime,
    timeSpan,
  }
}

export function addEventError () {
  return {
    type: ADD_EVENT_ERROR,
    error: 'you already have something planned at this time!'
  }
}

export function removeAddEventError () {
  return {
    type: REMOVE_ADD_EVENT_ERROR,
  }
}

export function updateOccupied (start, span) {
  return {
    type: UPDATE_OCCUPIED,
    start,
    span,
  }
}

export function addAndHandleEvent (dateTimeNum, eventText) {
  return function (dispatch, getState) {
    const uid = getState().users.get('authedId')
    const dateTimeNum = getState().days.get('dateTimeNum')
    const startTime = getState().events.get('eventStartTime')
    const timeSpan = getState().events.get('eventTimeSpan')

    dispatch(addEvent(eventText, startTime, timeSpan))
    dispatch(updateOccupied(startTime, timeSpan))
    dispatch(closeModal())
  }
}

const initialState = fromJS({
  isFetching: false,
  occupied: [false, false, false, false, false, false, false, false, false, false, false, false],
  error: '',
})

export default function events (state = initialState, action) {
  switch (action.type) {
    case FETCHING_EVENTS :
      return state.merge({
        isFetching: true,
      })
    case UPDATE_EVENT_START_TIME :
      return state.merge({
        eventStartTime: action.num
      })
    case UPDATE_EVENT_TIME_SPAN :
      return state.merge({
        eventTimeSpan: action.num
      })
    case ADD_EVENT :
      return state.merge({[action.startTime]: {timeSpan: action.timeSpan, eventText: action.eventText}})
    case UPDATE_OCCUPIED :
      const a = state.get('occupied').toJS()
      a.splice(action.start, action.span)
      for (let i = 0; i < action.span; i++) {
        a.splice(action.start, 0, true)
      }
      return state.merge({
        occupied: List(a)
      })
    case ADD_EVENT_ERROR :
      return state.merge({
        error: action.error,
      })
    case REMOVE_ADD_EVENT_ERROR :
      return state.merge({
        error: ''
      })
    default :
      return state
  }
}