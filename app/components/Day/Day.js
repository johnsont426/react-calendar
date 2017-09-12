import React from 'react'
import PropTypes from 'prop-types'
import { dateCell, hasEvent, today, selected } from './styles.css'

export default function Day (props) {
  const hasEventStyle = props.hasEvent ? [dateCell, hasEvent] : [dateCell]
  if (props.isToday) {
    hasEventStyle.push(today)
  }
  if (props.isSelected) {
    hasEventStyle.push(selected)
  }
  const dateCellStyle = hasEventStyle.join(' ')
  return (
    <td onClick={props.handleClick} className={dateCellStyle} style={props.date === 0 ? {visibility: 'hidden'} : null}>{props.date ? props.date : null}</td>
  )
}

Day.propTypes = {
  date: PropTypes.number.isRequired,
  hasEvent: PropTypes.bool.isRequired,
  isToday: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
}