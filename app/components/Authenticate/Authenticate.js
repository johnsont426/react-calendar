import React from 'react'
import PropTypes from 'prop-types'
import { FacebookAuthButton } from 'components'
import { centeredContainer, largeHeader, errorMsg } from 'sharedStyles/styles.css'

export default function Authenticate ({onAuth}) {
  return (
    <div className={centeredContainer}>
      <h1 className={largeHeader}>Log in to start planning ahead!</h1>
      <FacebookAuthButton onAuth={onAuth}/>
    </div>
  )
}

Authenticate.propTypes = {
  onAuth: PropTypes.func.isRequired,
}