import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Calendar } from 'components'
import { formattedMonth } from 'helpers/utils'
import { bindActionCreators } from 'redux'
import * as calendarActionCreators from 'redux/modules/calendar'


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
    this.props.lastMonth()
  }
  handleClickNextMonth () {
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
  monthNum: PropTypes.number.isRequired,
  dayOfTheFirst: PropTypes.number.isRequired,
  daysInMonth: PropTypes.number.isRequired,
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
  return bindActionCreators(calendarActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarContainer)