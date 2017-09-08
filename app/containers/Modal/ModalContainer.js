import { Modal } from 'components'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as modalActionCreators from 'redux/modules/modal'
import * as eventsActionCreators from 'redux/modules/events'

function mapStateToProps ({modal, events}) {
	const eventTextLength = modal.get('eventText').length
	return {
		isOpen: modal.get('isOpen'),
		eventText: modal.get('eventText'),
		isSubmitDisabled: eventTextLength === 0,
    newEventStartTime: events.get('eventStartTime'),
    newEventTimeSpan: events.get('eventTimeSpan'),
    occupied: events.get('occupied').toJS(),
    error: events.get('error')
	}
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators({
		...modalActionCreators,
		...eventsActionCreators}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)