import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Calendar } from 'components'
import { formattedMonth } from 'helpers/utils'


class CalendarContainer extends React.Component {
  render () {
    return (
      <Calendar
        month={formattedMonth(this.props.monthNum)}
        dayOfTheFirst={this.props.dayOfTheFirst}
        daysInMonth={this.props.daysInMonth} />
    )
  }
}

CalendarContainer.propTypes = {
  monthNum: PropTypes.number.isRequired,
  dayOfTheFirst: PropTypes.number.isRequired,
  daysInMonth: PropTypes.number.isRequired,
}

function mapStateToProps (state) {
  return {
    monthNum: state.monthNum,
    dayOfTheFirst: state.dayOfTheFirst,
    daysInMonth: state.daysInMonth,
  }
}

export default connect(mapStateToProps)(CalendarContainer)