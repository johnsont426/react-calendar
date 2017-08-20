import React from 'react'
import PropTypes from 'prop-types'

export default function Day (props) {
  return (
    <td>{props.date}</td>
  )
}

Day.propTypes = {
  date: PropTypes.number.isRequired,
}