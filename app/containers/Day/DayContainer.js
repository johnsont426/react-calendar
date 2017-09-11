import React from 'react'
import PropTypes from 'prop-types'
import { Day } from 'components'
import { connect } from 'react-redux'
import * as daysActionCreators from 'redux/modules/days'
import * as scheduleActionCreators from 'redux/modules/schedule'
import { bindActionCreators } from 'redux'
import { dateToNum, timeNumToFormattedDate, todayDateTimeNum } from 'helpers/utils'


class DayContainer extends React.Component {
	handleClick () {
		const timeNum = dateToNum(this.props.yearNum, this.props.monthNum, this.props.date)
		this.props.updateDate(timeNum)
		this.props.updateFormattedDate(timeNumToFormattedDate(timeNum))
	}
  render () {
  	const timeNum = dateToNum(this.props.yearNum, this.props.monthNum, this.props.date)
  	const hasEvent = this.props.occupiedArray.includes(`${timeNum}`)
  	const isToday = timeNum === todayDateTimeNum
    return (
      <Day date={this.props.date} isToday={isToday} hasEvent={hasEvent} handleClick={this.handleClick.bind(this)}/>
    )
  }
}

DayContainer.propTypes = {
  date: PropTypes.number.isRequired,
  yearNum: PropTypes.number.isRequired,
  monthNum: PropTypes.number.isRequired,
  dayOfTheFirst: PropTypes.number.isRequired,
  occupiedArray: PropTypes.array.isRequired,
}

function mapStateToProps ({calendar}) {
	return {
		yearNum: calendar.get('yearNum'),
		monthNum: calendar.get('monthNum'),
		dayOfTheFirst: calendar.get('dayOfTheFirst'),
		occupiedArray: calendar.get('occupiedDates').toJS(),
	}
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators({
		...daysActionCreators,
		...scheduleActionCreators,
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DayContainer)