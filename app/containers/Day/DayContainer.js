import React from 'react'
import PropTypes from 'prop-types'
import { Day } from 'components'
import { connect } from 'react-redux'
import * as daysActionCreators from 'redux/modules/days'
import * as schedulesActionCreators from 'redux/modules/schedules'
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
  	const isSelected = timeNum === this.props.currentSelectedDateTimeNum
    return (
      <Day date={this.props.date} isSelected={isSelected} isToday={isToday} hasEvent={hasEvent} handleClick={this.handleClick.bind(this)}/>
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

function mapStateToProps ({calendar, days}) {
	return {
		yearNum: calendar.get('yearNum'),
		monthNum: calendar.get('monthNum'),
		dayOfTheFirst: calendar.get('dayOfTheFirst'),
		occupiedArray: calendar.get('occupiedDates').toJS(),
		currentSelectedDateTimeNum: days.get('dateTimeNum'),
	}
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators({
		...daysActionCreators,
		...schedulesActionCreators,
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DayContainer)