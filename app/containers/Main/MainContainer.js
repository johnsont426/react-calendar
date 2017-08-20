import React from 'react'
import { Router } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import { HomeContainer } from 'containers'
import createHistory from 'history/createBrowserHistory';

const history = createHistory()

class MainContainer extends React.Component {
  render () {
    return (
      <div>
        <Router history={history}>
          <Switch>
            <Route exact path='/' component={HomeContainer} />
          </Switch>
        </Router>
      </div>
    )
  }
}
export default MainContainer