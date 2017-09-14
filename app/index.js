import React from 'react'
import ReactDOM from 'react-dom'
import { MainContainer } from 'containers'
import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import * as reducers from 'redux/modules'
import thunk from 'redux-thunk'
import { checkIfAuthed } from 'helpers/auth'

const store = createStore(combineReducers(reducers), compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
))

function checkAuth () {
  if (store.getState().users.get('isFetching') === true) {
    return
  }

  const isAuthed = checkIfAuthed(store)
  const pathName = this.props.match.path
  if (pathName === '/calendar' && isAuthed === false) {
    this.props.history.push({pathname: '/'})
  }
}

ReactDOM.render(
  <Provider store={store}>
    <MainContainer checkAuth={checkAuth}/>
  </Provider>,
  document.getElementById('app')
)

