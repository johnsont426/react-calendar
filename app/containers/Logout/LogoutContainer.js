import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Logout } from 'components'
import { connect } from 'react-redux'
import { logoutAndUnauth } from 'redux/modules/users'

class LogoutContainer extends Component {
  redirect () {
    this.props.history.push({pathname: '/'})
  }
  componentDidMount () {
    this.props.dispatch(logoutAndUnauth())
    setTimeout(this.redirect.bind(this), 3000)
  }
  render () {
    return (
      <Logout />
    )
  }
}

LogoutContainer.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default connect()(LogoutContainer)