import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Schedule } from 'components'
import { connect } from 'react-redux'
import { timeNumToFormattedDate } from 'helpers/utils'
import { bindActionCreators } from 'redux'
import * as modalActionCreators from 'redux/modules/modal'

class ScheduleContainer extends Component {
  render () {
    return (
      <Schedule 
      	formattedDate={this.props.formattedDate}
      	events={this.props.events}
      	openModal={this.props.openModal} />
    )
  }
}

ScheduleContainer.propTypes = {
	formattedDate: PropTypes.string.isRequired,
}

function mapStateToProps ({schedule, events}) {
  return {
    formattedDate: schedule.get('formattedDate'),
    events: events.get('events'),
  }
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators(modalActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleContainer)