import React, { Component } from 'react'
import store from './store'

export default class ReduxPage extends Component {
  componentDidMount () {
    // 组件订阅
    this.unsubscribe = store.subscribe(() => {
      // store state 改变
      // 默认情况下，当组件的 state 或 props 发生变化时，组件将重新渲染。如果 render() 方法依赖于其他数据，则可以调用 forceUpdate() 强制让组件重新渲染。
      this.forceUpdate()
    })
  }

  componentWillUnmount () {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  }

  add = () => {
    store.dispatch({ type: 'ADD' })
    // console.log('add', store.getState()); // sys-log
  }
  render () {
    return (
      <div>
        <h1>redux上手 - 实现一个累加器</h1>
        <p>{store.getState()}</p>
        <button onClick={this.add} >add</button>
      </div>
    )
  }
}
