import React from 'react'
import PropTypes from 'prop-types'
import { scheduleBlock, occupiedScheduleBlock, eventTextP, removeEventBtn, eventContent } from './styles.css'

function RemoveEventButton (props) {
  return <div className={removeEventBtn} onClick={props.removeEvent}><p>X</p></div>
}

export default function ScheduleBlock (props) {
  const {openModal, updateIndex, scheduleBlockIndex, updateEventStartTime, 
    updateEventTimeSpan, occupied, newEventStart, eventText, mouseEnter, mouseLeave, hovered, deleteAndHandleEvent} = props
  function down () {
    updateEventStartTime(scheduleBlockIndex)
  }
  function up () {
    updateEventTimeSpan(scheduleBlockIndex - newEventStart + 1)
    openModal()
  }
  function activate () {
    mouseEnter(scheduleBlockIndex)
  }
  function deactivate () {
    mouseLeave(scheduleBlockIndex)
  }
  function handleDelete (e) {
    e.stopPropagation()
    deleteAndHandleEvent(scheduleBlockIndex)
  }
  return (
    <li className={occupied[scheduleBlockIndex] ? occupiedScheduleBlock : scheduleBlock}
        onMouseDown={down}
        onMouseUp={up}>
      {eventText
        ? <div className={eventContent} onMouseEnter={activate} onMouseLeave={deactivate}>
            <p className={eventTextP}>{eventText}</p>
            {hovered ? <RemoveEventButton removeEvent={handleDelete}/> : null}
          </div>
        : null }
    </li>
  )
}