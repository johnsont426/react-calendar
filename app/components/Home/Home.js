import React from 'react'
import PropTypes from 'prop-types'
import { container, title, slogan } from './styles.css'

export default function Home (props) {
  return (
    <div className={container}>
      <p className={title}>{'React Calendar'}</p>
      <p className={slogan}>{'Beautiful calendar'}</p>
    </div>
  )
}