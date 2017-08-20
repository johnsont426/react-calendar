import React from 'react'
import PropTypes from 'prop-types'
import { Day } from 'components'


class DayContainer extends React.Component {
  render () {
    return (
      <Day date={this.props.date}/>
    )
  }
}

DayContainer.propTypes = {
  date: PropTypes.number.isRequired,
}

export default DayContainer