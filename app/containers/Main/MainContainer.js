import React from 'react'
import PropTypes from 'prop-types'
import { Router } from 'react-router'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import { HomeContainer, CalendarContainer, AuthenticateContainer, LogoutContainer } from 'containers'
import createHistory from 'history/createBrowserHistory';
import { Navigation } from 'components'
import { connect } from 'react-redux'
import { firebaseAuth } from 'config/constants'
import { formatUserInfo } from 'helpers/utils'
import * as usersActionCreators from 'redux/modules/users'
import * as calendarActionCreators from 'redux/modules/calendar'
import { bindActionCreators } from 'redux'
import { container, innerContainer } from './styles.css'

const history = createHistory()

class MainContainer extends React.Component {
  componentWillMount () {
    firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        const userData = user.providerData[0]
        const userInfo = formatUserInfo(userData.displayName, userData.photoURL, user.uid)
        this.props.authUser(user.uid)
        this.props.fetchingUserSuccess(user.uid, userInfo, Date.now())
        this.props.fetchAndHandleOccupiedDate()
      } else {
        this.props.removeFetchingUser()
      }
    })
  }
  render () {
    return (
      <BrowserRouter history={history}>
        <div className={container}>
          <Navigation isAuthed={this.props.isAuthed} />
          <div className={innerContainer}>
            <Route exact path='/' render={(props) => <HomeContainer {...props} isAuthed={this.props.isAuthed} />} />
            <Route path='/calendar' render={(props) => <CalendarContainer {...props} checkAuth={this.props.checkAuth} />} />
            <Route path='/logout' component={LogoutContainer} />
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

MainContainer.propTypes = {
  authUser: PropTypes.func.isRequired,
  fetchingUserSuccess: PropTypes.func.isRequired,
  fetchAndHandleOccupiedDate: PropTypes.func.isRequired,
  removeFetchingUser: PropTypes.func.isRequired,
  isAuthed: PropTypes.bool.isRequired,
}

function mapStateToProps ({users}) {
  return {
    isAuthed: users.get('isAuthed'),
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...usersActionCreators,
    ...calendarActionCreators}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)