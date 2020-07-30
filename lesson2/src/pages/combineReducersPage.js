import React from 'react'
import { createStore } from 'redux'
import reducer from './reducers'

export default function combineReducersPage () {
  let store = createStore(reducer)
  console.log(store.getState())
  store.dispatch({
    type: 'ADD_TODO',
    text: 'Use Redux'
  })
  store.dispatch({
    type: 'ADD',
    text: 'Use Redux...'
  })
  console.log(store.getState())
  return (
    <div>
      <h1>combineReducersPage</h1>
    </div>
  )
}
