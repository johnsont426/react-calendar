import React from 'react'
import PropTypes from 'prop-types'
import { scheduleContainer } from './styles.css'

function ScheduleBlock ({event}) {
  return <li>{event}</li>
}

export default function Schedule (props) {
  return (
    <div className={scheduleContainer}>
      <h1>{props.formattedDate}</h1>
      <ul>
        {props.events.map((event) => <ScheduleBlock event={event} />)}
      </ul>
    </div>
  )
}