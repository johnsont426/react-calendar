import React from 'react'
import PropTypes from 'prop-types'

export default function Todo (props) {
  return (
    <div>
      <h1>{props.formattedDate}</h1>
      <h2>Todo</h2>
      <ul>

      </ul>
      <input type="text" />
      <button>submit</button>
    </div>
  )
}