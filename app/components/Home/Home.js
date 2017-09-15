import React from 'react'
import PropTypes from 'prop-types'
import { FacebookAuthButton } from 'components'
import { title, slogan, container, header, subHeader, comingEventBlock, flexContainer, startTimeLabel, comingEventText, authContainer, calendarImg, button, buttonDiv } from './styles.css'
import { timeNumToFormattedDate, indexToTime } from 'helpers/utils'
import { Link } from 'react-router-dom'
import { centeredContainer, largeHeader, errorMsg } from 'sharedStyles/styles.css'

function Authenticate ({onAuth}) {
  return (
    <div className={authContainer}>
		  <h1 className={title}>Quick Calendar</h1>
		  <img src={require('../../images/calendar.png')} className={calendarImg}/>
		  <h2 className={slogan}>Simple calendar and planner, log in to start planning!</h2>
		  <FacebookAuthButton onAuth={onAuth}/>
    </div>
  )
}

Authenticate.propTypes = {
  onAuth: PropTypes.func.isRequired,
}

function ComingEventsDiv ({dateTimeNum, startTimeArray, eventTextArray}) {
  return (
    <div className={comingEventBlock}>
    	<h1 className={subHeader}>{timeNumToFormattedDate(Number(dateTimeNum))}</h1>
    	{startTimeArray.map((startTime, index) => {
    		return (
    			<div className={flexContainer} key={index}>
	    			<p className={startTimeLabel}>{indexToTime(startTime)}</p>
	    			<p className={comingEventText}>{eventTextArray[index]}</p>
	    		</div>
    		)
    	})}
    </div>
  )
}

ComingEventsDiv.propTypes = {
	dateTimeNum: PropTypes.string.isRequired,
	startTimeArray: PropTypes.array.isRequired,
	eventTextArray: PropTypes.array.isRequired,
}

export default function Home ({comingEventsArray, isAuthed, onAuth, userName}) {
	if (isAuthed) {
	  return (
	    <div className={container}>
	    	<h1 className={header}>{comingEventsArray.length === 0 ? `Greeting ${userName}! You have't planned anything for the next five days yet, add an event now?` : `Greeting ${userName}! You have the following events coming up:`}</h1>
	    	{comingEventsArray.length === 0 ? <div className={buttonDiv}><Link to="/calendar" className={button}>{'Go to Calendar'}</Link></div> : null}
	      {comingEventsArray.map((comingEventObject) => {
	      	const startTimeArray = []
					const eventTextArray = []
					for (let dateTimeNum in comingEventObject) {
						for (let startTime in comingEventObject[dateTimeNum]) {
							startTimeArray.push(startTime)
							eventTextArray.push(comingEventObject[dateTimeNum][startTime]['eventText'])
						}
					}
					const dateTimeNum = Object.keys(comingEventObject)[0]
					return <ComingEventsDiv key={dateTimeNum} dateTimeNum={dateTimeNum} startTimeArray={startTimeArray} eventTextArray={eventTextArray} />
	      })}
	    </div>
  	)
  } else {
  	return <Authenticate onAuth={onAuth}/>
  }
}

Home.propTypes = {
	comingEventsArray: PropTypes.array.isRequired,
	isAuthed: PropTypes.bool.isRequired,
	onAuth: PropTypes.func.isRequired,
	userName: PropTypes.string.isRequired,
}