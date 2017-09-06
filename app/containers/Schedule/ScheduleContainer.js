import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Schedule } from 'components'
import { connect } from 'react-redux'
import { timeNumToFormattedDate } from 'helpers/utils'

class ScheduleContainer extends Component {
  render () {
    return (
      <Schedule formattedDate={this.props.formattedDate} events={this.props.events}/>
    )
  }
}

ScheduleContainer.propTypes = {
	formattedDate: PropTypes.string.isRequired,
}

function mapStateToProps ({schedule}) {
  return {
    formattedDate: schedule.get('formattedDate'),
    events: schedule.get('events'),
  }
}

export default connect(mapStateToProps)(ScheduleContainer)