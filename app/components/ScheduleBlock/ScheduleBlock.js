import React from 'react'
import PropTypes from 'prop-types'
import { scheduleBlock, occupiedScheduleBlock, eventTextP } from './styles.css'

export default function ScheduleBlock ({openModal, updateIndex, scheduleBlockIndex, updateEventStartTime, updateEventTimeSpan, occupied, newEventStart, eventText}) {
  function down () {
    updateEventStartTime(scheduleBlockIndex)
  }
  function up () {
    updateEventTimeSpan(scheduleBlockIndex - newEventStart + 1)
    openModal()
  }
  return (
    <li className={occupied[scheduleBlockIndex] ? occupiedScheduleBlock : scheduleBlock}
        onMouseDown={down}
        onMouseUp={up}>
      {eventText ? <p className={eventTextP}>{eventText}</p> : null }
    </li>
  )
}