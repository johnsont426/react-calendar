import React from 'react'
import PropTypes from 'prop-types'
import { Home } from 'components'
import { connect } from 'react-redux'

class HomeContainer extends React.Component {
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
  render () {
    return (
      <Home />
    )
  }
}

HomeContainer.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  checkAuth: PropTypes.func.isRequired,
}

function mapStateToProps ({users}) {
  return { isFetching: users.get('isFetching') }
}

export default connect(mapStateToProps)(HomeContainer)