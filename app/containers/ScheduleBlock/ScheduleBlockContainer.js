import React, { Component } from 'react'
import { ScheduleBlock } from 'components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as modalActionCreators from 'redux/modules/modal'
import * as eventsActionCreators from 'redux/modules/events'

function mapStateToProps ({events}, props) {
  return {
    newEventStart: events.get('eventStartTime'),
    occupied: events.get('occupied').toJS(),
    eventText: events.getIn([`${props.scheduleBlockIndex}`, 'eventText']) || '',
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...modalActionCreators,
    ...eventsActionCreators}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleBlock)