import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { link, container, navContainer } from './styles.css'

function NavLinks ({isAuthed}) {
  return isAuthed === true
    ? <ul>
        <li><NavLink to="/" className={link}>{'Home'}</NavLink></li>
        <li><NavLink to="/calendar" className={link}>{'My Calendar'}</NavLink></li>
      </ul>
    : null
}

function ActionLinks ({isAuthed}) {
	return isAuthed === true
		? <ul>
        <li><NavLink to="/logout" className={link}>{'Logout'}</NavLink></li>
      </ul>
    : <ul>
        <li><NavLink to="/" className={link}>{'Quick Calendar'}</NavLink></li>
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