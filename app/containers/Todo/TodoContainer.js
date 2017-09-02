import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Todo } from 'components'
import { connect } from 'react-redux'
import { timeNumToFormattedDate } from 'helpers/utils'

class TodoContainer extends Component {
  render () {
    return (
      <Todo formattedDate={this.props.formattedDate}/>
    )
  }
}

TodoContainer.propTypes = {
	formattedDate: PropTypes.string.isRequired
}

function mapStateToProps ({todos}) {
  return {
    formattedDate: todos.get('formattedDate'),
  }
}

export default connect(mapStateToProps)(TodoContainer)