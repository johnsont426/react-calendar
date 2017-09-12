import React from 'react'
import PropTypes from 'prop-types'
import { scheduleBlock, occupiedScheduleBlock, eventTextP, removeEventBtn, eventContent } from './styles.css'

function RemoveEventButton (props) {
  return <div className={removeEventBtn} onMouseUp={props.removeEvent}><p>X</p></div>
}

RemoveEventButton.propTypes = {
  removeEvent: PropTypes.func.isRequired,
}

export default function ScheduleBlock (props) {
  const {openModal, scheduleBlockIndex, updateEventStartTime, 
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

const { func, bool, string, number, array } = PropTypes

ScheduleBlock.propTypes = {
  openModal: func.isRequired,
  scheduleBlockIndex: number.isRequired,
  updateEventStartTime: func.isRequired,
  updateEventTimeSpan: func.isRequired,
  occupied: array.isRequired,
  newEventStart: number.isRequired,
  eventText: string.isRequired,
  mouseEnter: func.isRequired,
  mouseLeave: func.isRequired,
  hovered: bool.isRequired,
  deleteAndHandleEvent: func.isRequired,
}