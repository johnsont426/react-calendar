import React from 'react'
import PropTypes from 'prop-types'
import { DayContainer } from 'containers'
import { getCorrectDate } from 'helpers/utils'

export default function Calendar (props) {
	function getDayContainer (num) {
		return <DayContainer key={num} date={getCorrectDate(num - props.dayOfTheFirst, props.daysInMonth)}/>
	}
  return (
    <div>
    	<h1>{props.month}</h1>
      <table>
      	<thead>
      		<tr>
      			<th>Sun</th>
      			<th>Mon</th>
      			<th>Tue</th>
      			<th>Wed</th>
      			<th>Thu</th>
      			<th>Fri</th>
      			<th>Sat</th>
      		</tr>
      	</thead>
      	<tbody>
	        <tr>
	          {[1,2,3,4,5,6,7].map(getDayContainer)}
	        </tr>
	        <tr>
	          {[8,9,10,11,12,13,14].map(getDayContainer)}
	        </tr>
	        <tr>
	          {[15,16,17,18,19,20,21].map(getDayContainer)}
	        </tr>
	        <tr>
	          {[22,23,24,25,26,27,28].map(getDayContainer)}
	        </tr>
	        <tr>
	          {[29,30,31,32,33,34,35].map(getDayContainer)}
	        </tr>
	      </tbody>
      </table>
    </div>
  )
}

Calendar.propTypes = {
	month: PropTypes.string.isRequired,
	dayOfTheFirst: PropTypes.number.isRequired,
	daysInMonth: PropTypes.number.isRequired,
}