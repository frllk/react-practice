import React, { Component } from 'react'
import store from '../store'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

@connect{
  // mapStateToProps function
  state = ({ count: state, count })
  // mapDispatchToProps object | function
  // {
  //   add: () => {
  //     type: 'ADD'
  //   }
  // }

}
dispatch = () => {
  const add = () => dispatch({ type: 'ADD' })
  const minus = () => dispatch({ type: 'MINUS' })

  let creators = {
    add: () => ({ type: 'ADD' }),
    minus: () => ({ type: 'MINUS' })
  }
  creators = bindActionCreators(creators, dispatch)


  return { dispatch, ...creators }
}
class ReactReduxPage extends Component {

  componentDidMount () {
    this.unsubscrible = store.subscribe(() => {
      this.forceUpdate()
    })
  }
  componentWillUnmount () {
    if (this.unsubscrible)
      this.unsubscrible()
  }

  dispatchAdd = () => {
    store.dispatch({ type: 'ADD' })
  }

  render () {
    const { count, add, minus } = this.props
    return (
      <div>
        <h3>ReactReduxPage</h3>
        <p>{store.getState().count}</p>
        <button onClick={this.dispatchAdd}>dispatch add</button>
        <button onClick={this.add}> add</button>
        <button onClick={this.minus}>minus</button>
      </div>
    )
  }
}
export default ReactReduxPage