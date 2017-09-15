import React from 'react'
import PropTypes from 'prop-types'
import { Home } from 'components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as eventsActionCreators from 'redux/modules/events'
import * as usersActionCreators from 'redux/modules/users'

class HomeContainer extends React.Component {
  handleComingEvents () {
    if (this.props.isAuthed) {
      this.props.fetchAndHandleComingEvents()
    }
  }
  componentDidUpdate () {
    setTimeout(this.handleComingEvents.bind(this), 1000)
  }
  componentDidMount () {
    setTimeout(this.handleComingEvents.bind(this), 1000)
  }
  handleAuth () {
    this.props.fetchAndHandleAuthedUser()
  }
  render () {
    return (
      <Home userName={this.props.userName} onAuth={this.handleAuth.bind(this)} comingEventsArray={this.props.comingEventsArray} isAuthed={this.props.isAuthed}/>
    )
  }
}

HomeContainer.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  isAuthed: PropTypes.bool.isRequired,
  comingEventsArray: PropTypes.array.isRequired,
  userName: PropTypes.string.isRequired,
}

function mapStateToProps ({users, events}) {
  const id = users.get('authedId')
  return {
    isFetching: users.get('isFetching'),
    comingEventsArray: events.get('comingEventsArray').toJS(),
    userName: users.getIn([`${id}`, 'info', 'name']) || '',
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...eventsActionCreators,
    ...usersActionCreators}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)