import React from 'react'
import PropTypes from 'prop-types'
import { dateCell, hasEvent, today } from './styles.css'

export default function Day (props) {
  const hasEventStyle = props.hasEvent ? [dateCell, hasEvent] : [dateCell]
  if (props.isToday) {
    hasEventStyle.push(today)
  }
  const dateCellStyle = hasEventStyle.join(' ')
  return (
    <td onClick={props.handleClick} className={dateCellStyle}>{props.date ? props.date : null}</td>
  )
}

Day.propTypes = {
  date: PropTypes.number.isRequired,
}