import React from 'react'
import PropTypes from 'prop-types'
import { dateCell } from './styles.css'

export default function Day (props) {
  return (
    <td onClick={props.handleClick} className={dateCell}>{props.date}</td>
  )
}

Day.propTypes = {
  date: PropTypes.number.isRequired,
}