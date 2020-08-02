import React, { Component } from 'react'
import { RouterContext } from './Context'

export default class Router extends Component {
  static computeRootMatch (pathname) {
    return { path: "/", url: "/", params: {}, isExact: pathname === "/" };
  }
  constructor(props) {
    super(props)
    this.state = {
      location: props.history.location
    }
    // location发生变化的话，所有子组件重新渲染, 并且监听location，location发生变化，组件也要进行重新渲染
    // location 发生变化，要执行这里的回调
    this.unlisten = props.history.listen((location) => {
      //  组件进行渲染，并且子组件也要获取location
      this.setState({ location })
    })
  }
  componentWillUnmount () {
    // 取消监听
    if (this.unlisten) {
      this.unlisten()
    }
  }
  render () {
    return <RouterContext.Provider
      value={{
        history: this.props.history,
        location: this.state.location,
        match: Router.computeRootMatch(this.state.location.pathname)
      }}>
      {this.props.children}
    </RouterContext.Provider>
  }
}
