import React from 'react'
import PropTypes from 'prop-types'
import { DayContainer, ScheduleContainer } from 'containers'
import { getCorrectDate } from 'helpers/utils'
import { flexContainer, calendarContainer, monthHeaderBlock, monthHeader, calendarTable, tableHeaderCells, weekdays, tableRow, prev, next } from './styles.css'

export default function Calendar (props) {
	function getDayContainer (num) {
		return <DayContainer key={num} date={getCorrectDate(num - props.dayOfTheFirst, props.daysInMonth)}/>
	}
  return (
  	<div className={flexContainer}>
	    <div className={calendarContainer}>
	    	<div className={monthHeaderBlock}>
	    		<p onClick={props.handleClickLastMonth} className={prev}>&#10094;</p>
	    		<p className={monthHeader}>{props.month}</p>
	    		<p onClick={props.handleClickNextMonth} className={next}>&#10095;</p>
	    	</div>
	      <table className={calendarTable}>
	      	<thead>
	      		<tr className={weekdays}>
	      			<th className={tableHeaderCells}>Sun</th>
	      			<th className={tableHeaderCells}>Mon</th>
	      			<th className={tableHeaderCells}>Tue</th>
	      			<th className={tableHeaderCells}>Wed</th>
	      			<th className={tableHeaderCells}>Thu</th>
	      			<th className={tableHeaderCells}>Fri</th>
	      			<th className={tableHeaderCells}>Sat</th>
	      		</tr>
	      	</thead>
	      	<tbody>
		        <tr className={tableRow}>
		          {[1,2,3,4,5,6,7].map(getDayContainer)}
		        </tr>
		        <tr className={tableRow}>
		          {[8,9,10,11,12,13,14].map(getDayContainer)}
		        </tr>
		        <tr className={tableRow}>
		          {[15,16,17,18,19,20,21].map(getDayContainer)}
		        </tr>
		        <tr className={tableRow}>
		          {[22,23,24,25,26,27,28].map(getDayContainer)}
		        </tr>
		        <tr className={tableRow}>
		          {[29,30,31,32,33,34,35].map(getDayContainer)}
		        </tr>
		        <tr className={tableRow}>
		          {[36,37,38,39,40,41,42].map(getDayContainer)}
		        </tr>
		      </tbody>
	      </table>
	    </div>
	    <ScheduleContainer />
	  </div>
  )
}

Calendar.propTypes = {
	month: PropTypes.string.isRequired,
	dayOfTheFirst: PropTypes.number.isRequired,
	daysInMonth: PropTypes.number.isRequired,
	handleClickNextMonth: PropTypes.func.isRequired,
	handleClickLastMonth: PropTypes.func.isRequired,
}