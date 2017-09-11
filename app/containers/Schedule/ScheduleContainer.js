import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Schedule } from 'components'
import { connect } from 'react-redux'
import { timeNumToFormattedDate } from 'helpers/utils'
import { bindActionCreators } from 'redux'
import * as modalActionCreators from 'redux/modules/modal'
import * as eventsActionCreators from 'redux/modules/events'

class ScheduleContainer extends Component {
  componentWillReceiveProps () {
    this.props.clearEvents()
    this.props.fetchAndHandleEvents()
  }
  render () {
    return this.props.dateTimeNum
      ? <Schedule
        	formattedDate={this.props.formattedDate}
        	openModal={this.props.openModal} />
      : <p>Please select a date</p>
  }
}

ScheduleContainer.propTypes = {
  clearEvents: PropTypes.func.isRequired,
  fetchAndHandleEvents: PropTypes.func.isRequired,
	formattedDate: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
}

function mapStateToProps ({schedule, events, days}) {
  return {
    formattedDate: schedule.get('formattedDate'),
    events: events.get('events'),
    dateTimeNum: days.get('dateTimeNum'),
  }
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators({
    ...modalActionCreators,
    ...eventsActionCreators}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleContainer)