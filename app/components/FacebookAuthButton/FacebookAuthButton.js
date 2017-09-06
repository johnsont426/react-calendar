import React from 'react'
import PropTypes from 'prop-types'
import { button } from './styles.css'

export default function FacebookAuthButton ({onAuth}) {
  return (
    <button className={button} onClick={onAuth}>
      {'Login with Facebook'}
    </button>
  )
}