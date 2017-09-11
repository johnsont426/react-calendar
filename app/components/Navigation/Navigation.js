import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { link, container, navContainer } from './styles.css'

function NavLinks ({isAuthed}) {
  return isAuthed === true
    ? <ul>
        <li><Link to="/calendar" className={link}>{'My Calendar'}</Link></li>
      </ul>
    : null
}

function ActionLinks ({isAuthed}) {
	return isAuthed === true
		? <ul>
        <li><Link to="/logout" className={link}>{'Logout'}</Link></li>
      </ul>
    : <ul>
        <li><Link to="/" className={link}>{'Home'}</Link></li>
        <li><Link to='/auth' className={link}>{'Authenticate'}</Link></li>
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