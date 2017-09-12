import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Calendar } from 'components'
import { formattedMonth } from 'helpers/utils'
import { bindActionCreators } from 'redux'
import * as calendarActionCreators from 'redux/modules/calendar'
import * as eventsActionCreators from 'redux/modules/events'
import * as schedulesActionCreators from 'redux/modules/schedules'
import * as daysActionCreators from 'redux/modules/days'


class CalendarContainer extends React.Component {
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
  handleClickLastMonth () {
    this.props.removeFormattedDate()
    this.props.lastMonth()
  }
  handleClickNextMonth () {
    this.props.removeFormattedDate()
    this.props.nextMonth()
  }
  render () {
    return (
      <Calendar
        month={formattedMonth(this.props.monthNum)}
        dayOfTheFirst={this.props.dayOfTheFirst}
        daysInMonth={this.props.daysInMonth}
        handleClickLastMonth={this.handleClickLastMonth.bind(this)}
        handleClickNextMonth={this.handleClickNextMonth.bind(this)}
      />
    )
  }
}

CalendarContainer.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  checkAuth: PropTypes.func.isRequired,
  lastMonth: PropTypes.func.isRequired,
  nextMonth: PropTypes.func.isRequired,
  monthNum: PropTypes.number.isRequired,
  dayOfTheFirst: PropTypes.number.isRequired,
  daysInMonth: PropTypes.number.isRequired,
  clearEvents: PropTypes.func.isRequired,
  removeFormattedDate: PropTypes.func.isRequired,
}

function mapStateToProps ({calendar, users}) {
  return {
    isFetching: users.get('isFetching'),
    monthNum: calendar.get('monthNum'),
    dayOfTheFirst: calendar.get('dayOfTheFirst'),
    daysInMonth: calendar.get('daysInMonth'),
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...calendarActionCreators,
    ...eventsActionCreators,
    ...schedulesActionCreators,
    ...daysActionCreators}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarContainer)