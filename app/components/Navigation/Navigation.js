import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { link, container, navContainer } from './styles.css'

function NavLinks ({isAuthed}) {
  return isAuthed === true
    ? <ul>
        <li>{'Home'}</li>
      </ul>
    : null
}

function ActionLinks ({isAuthed}) {
	return isAuthed === true
		? <ul>
        <li>{'Logout'}</li>
      </ul>
    : <ul>
        <li>{'Home'}</li>
        <li>{'Authenticate'}</li>
      </ul>
}

export default function Navigation ({isAuthed}) {
  return (
    <div className={container}>
      <nav className={navContainer}>
        <NavLinks isAuthed={isAuthed} />
        <ActionLinks isAuthed={isAuthed} />
      </nav>
    </div>
  )
}

Navigation.propTypes = ActionLinks.propTypes = NavLinks.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
}