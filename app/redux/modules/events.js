import { Map, fromJS, List } from 'immutable'
import { closeModal } from './modal'
import { saveEvent, saveOccupiedDate, fetchEvents, deleteEvent } from 'helpers/api'
import { updateOccupiedArray } from 'helpers/utils'
import { fetchAndHandleOccupiedDate } from './calendar'

const FETCHING_EVENTS = 'FETCHING_EVENTS'
const ADD_EVENT = 'ADD_EVENT'
const UPDATE_EVENT_START_TIME = 'UPDATE_EVENT_START_TIME'
const UPDATE_EVENT_TIME_SPAN = 'UPDATE_EVENT_TIME_SPAN'
const UPDATE_OCCUPIED = 'UPDATE_OCCUPIED'
const ADD_EVENT_ERROR = 'ADD_EVENT_ERROR'
const REMOVE_ADD_EVENT_ERROR = 'REMOVE_ADD_EVENT_ERROR'
const CLEAR_EVENTS = 'CLEAR_EVENTS'
const MOUSE_ENTER = 'MOUSE_ENTER'
const MOUSE_LEAVE = 'MOUSE_LEAVE'
const REMOVE_EVENT = 'REMOVE_EVENT'
const REMOVE_OCCUPIED = 'REMOVE_OCCUPIED'

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

export function clearEvents () {
  return {
    type: CLEAR_EVENTS,
  }
}

export function mouseEnter (scheduleBlockIndex) {
  return {
    type: MOUSE_ENTER,
    scheduleBlockIndex,
  }
}

export function mouseLeave (scheduleBlockIndex) {
  return {
    type: MOUSE_LEAVE,
    scheduleBlockIndex,
  }
}

export function removeEvent (eventStartTime) {
  return {
    type: REMOVE_EVENT,
    eventStartTime,
  }
}

export function removeOccupied (start, span) {
  return {
    type: REMOVE_OCCUPIED,
    start,
    span
  }
}

export function addAndHandleEvent (eventText) {
  return function (dispatch, getState) {
    const uid = getState().users.get('authedId')
    const dateTimeNum = getState().days.get('dateTimeNum')
    const startTime = getState().events.get('eventStartTime')
    const timeSpan = getState().events.get('eventTimeSpan')

    Promise.all([
      saveEvent(uid, dateTimeNum, startTime, timeSpan, eventText),
      saveOccupiedDate(uid, dateTimeNum)
    ]).then(() => {
        dispatch(addEvent(eventText, startTime, timeSpan))
        dispatch(updateOccupied(startTime, timeSpan))
        dispatch(fetchAndHandleOccupiedDate())
        dispatch(closeModal())
      })
  }
}

export function fetchAndHandleEvents () {
  return function (dispatch, getState) {
    const uid = getState().users.get('authedId')
    const dateTimeNum = getState().days.get('dateTimeNum')

    fetchEvents(uid, dateTimeNum).then((response) => {
      if (response) {
        for (let time in response) {
          dispatch(addEvent(response[time].eventText, time, response[time].eventTimeSpan))
          dispatch(updateOccupied(time, response[time].eventTimeSpan))
        }
      }
    })
  }
}

export function deleteAndHandleEvent (eventStartTime) {
  return function (dispatch, getState) {
    const uid = getState().users.get('authedId')
    const dateTimeNum = getState().days.get('dateTimeNum')
    const eventTimeSpan = getState().events.getIn([`${eventStartTime}`, 'timeSpan'])

    deleteEvent(uid, dateTimeNum, eventStartTime).then(() => {
      dispatch(removeEvent(eventStartTime))
      dispatch(removeOccupied(eventStartTime, eventTimeSpan))
      dispatch(fetchAndHandleOccupiedDate())
    })

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
      return state.merge({[action.startTime]: {timeSpan: action.timeSpan, eventText: action.eventText, hovered: false}})
    case UPDATE_OCCUPIED :
      let a = state.get('occupied').toJS()
      let newArray = updateOccupiedArray(a, action.start, action.span, true)
      return state.merge({
        occupied: List(newArray)
      })
    case ADD_EVENT_ERROR :
      return state.merge({
        error: action.error,
      })
    case REMOVE_ADD_EVENT_ERROR :
      return state.merge({
        error: ''
      })
    case CLEAR_EVENTS :
      return initialState
    case MOUSE_ENTER :
      return state.setIn([`${action.scheduleBlockIndex}`, 'hovered'], true)
    case MOUSE_LEAVE :
      return state.setIn([`${action.scheduleBlockIndex}`, 'hovered'], false)
    case REMOVE_EVENT :
      return state.delete(`${action.eventStartTime}`)
    case REMOVE_OCCUPIED :
      a = state.get('occupied').toJS()
      newArray = updateOccupiedArray(a, action.start, action.span, false)
      return state.merge({
        occupied: List(newArray)
      })
    default :
      return state
  }
}