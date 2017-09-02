import React from 'react'
import { Router } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import { HomeContainer, CalendarContainer, TodoContainer } from 'containers'
import createHistory from 'history/createBrowserHistory';
import { Navigation } from 'components'
import { connect } from 'react-redux'
import { mainContainer } from './styles.css'
const history = createHistory()

class MainContainer extends React.Component {
  render () {
    return (
      <Router history={history}>
        <div>
          <Navigation isAuthed={this.props.isAuthed}/>
          <div className={mainContainer}>
            <Route exact path='/' component={HomeContainer} />
            <Route path='/calendar' component={CalendarContainer} />
            <Route path='/calendar' component={TodoContainer} />
          </div>
        </div>
      </Router>
    )
  }
}

function mapStateToProps ({users}) {
  return {
    isAuthed: users.get('isAuthed')
  }
}
export default connect(mapStateToProps)(MainContainer)