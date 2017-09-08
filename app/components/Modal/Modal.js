import React from 'react'
import PropTypes from 'prop-types'
import { default as ReactModal } from 'react-modal'
import {
  newEventTop, pointer, newEventInputContainer,
  newEventInput, submitEventBtn, darkBtn } from './styles.css'

const modalStyles = {
  content: {
    width: 350,
    margin: '0px auto',
    height: 220,
    borderRadius: 5,
    background: '#D9DCD6',
    padding: 0,
  },
}

export default function Modal (props) {
  function checkIfOccupied (start, span) {
    for (let i = start; i < start + span; i++) {
      if (props.occupied[i]) {
        return true
      }
    }
    return false
  }
	function addEvent () {
    if (checkIfOccupied(props.newEventStartTime, props.newEventTimeSpan)) {
      props.addEventError()
    }else {
      props.addAndHandleEvent(props.eventText)
    }
	}
  function closeModalAndRemoveError () {
    props.closeModal()
    props.removeAddEventError()
  }
  return (
    <ReactModal style={modalStyles} isOpen={props.isOpen} onRequestClose={props.closeModal}>
      <div className={newEventTop}>
        <span>{'Add new event'}</span>
        <span onClick={closeModalAndRemoveError} className={pointer}>{'X'}</span>
      </div>
      <p>{props.error}</p>
      <div className={newEventInputContainer}>
        <textarea
          onChange={(e) => props.updateEventText(e.target.value)}
          value={props.eventText}
          maxLength={140}
          type='text'
          className={newEventInput}
          placeholder="Intereting Event?" />
      </div>
      <button
      	onClick={addEvent}
        className={submitEventBtn}
        disabled={props.isSubmitDisabled}
        >
          {'Add'}
      </button>
    </ReactModal>
  )
}