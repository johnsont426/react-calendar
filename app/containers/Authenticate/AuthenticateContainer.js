import React, { Component } from 'react'
import { Authenticate } from 'components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as usersActionsCreators from 'redux/modules/users'

class AuthenticateContainer extends Component {
  redirect () {
    if (this.props.isFetching === false) {
      this.props.checkAuth.apply(this)
    } else {
      setTimeout(this.redirect.bind(this), 1000)
    }
  }
  componentDidMount () {
    this.redirect.apply(this)
  }
  handleAuth () {
    this.props.fetchAndHandleAuthedUser()
      .then(() => this.props.history.push({pathname: '/calendar'}))
  }
  render () {
    return (
      <Authenticate onAuth={this.handleAuth.bind(this)}/>
    )
  }
}

function mapStateToProps ({users}) {
  return { isFetching: users.get('isFetching')}
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(usersActionsCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticateContainer)