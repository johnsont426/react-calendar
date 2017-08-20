import React from 'react'
import ReactDOM from 'react-dom'
import { MainContainer } from 'containers'
import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'
import months from 'redux/modules/months'

const store = createStore(months)

ReactDOM.render(
  <Provider store={store}>
    <MainContainer />
  </Provider>,
  document.getElementById('app')
)

