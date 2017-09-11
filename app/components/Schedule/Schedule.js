import React from 'react'
import PropTypes from 'prop-types'
import { ModalContainer, ScheduleBlockContainer } from 'containers'
import { scheduleContainer, scheduleList, timeLable, scheduleDiv, date } from './styles.css'

export default function Schedule ({formattedDate, openModal}) {
  return (
    <div className={scheduleContainer}>
      <ul className={timeLable}>
        <li>12 AM</li>
        <li>2 AM</li>
        <li>4 AM</li>
        <li>6 AM</li>
        <li>8 AM</li>
        <li>10 AM</li>
        <li>12 PM</li>
        <li>2 PM</li>
        <li>4 PM</li>
        <li>6 PM</li>
        <li>8 PM</li>
        <li>10 PM</li>
        <li></li>
      </ul>
      <ModalContainer />
      <div className={scheduleDiv}>
        <p className={date}>{formattedDate}</p>
        <ul className={scheduleList}>
          {["", "", "", "", "", "", "", "", "", "", "", ""].map((ele, index) => <ScheduleBlockContainer key={index} scheduleBlockIndex={index} openModal={openModal} />)}
        </ul>
      </div>
    </div>
  )
}

Schedule.propTypes = {
  formattedDate: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
}