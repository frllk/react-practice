/**
 * 让对应的组件渲染出来
 */
import React, { Component } from 'react'
import { RouterContext } from './Context'
import { matchPath } from 'react-router-dom';

export default class Route extends Component {
  render () {
    // Route进行重新渲染的时候，才会进行更新 ===> 监听location
    return <RouterContext.Consumer>
      {(context) => {
        // console.log('context', context); // sys-log
        const location = context.location
        const { children, component, render, path } = this.props
        // match: 匹配就渲染，不匹配就不渲染
        // 404的实现：===> 如果有match，就用自己的，如果没有，就用父子局传递下来的match
        const match = path ? matchPath(location.pathname, this.props) : context.match
        // location.pathname === path
        // window.location.pathname === path
        console.log('match', match); // sys-log
        const props = { ...context, match }

        // return match ? React.createElement(component, props) : null


        // match children，component，render，null

        // 不match children（function），null

        return match
          ? children
            ? typeof children === 'function'
              ? children(props)
              : children
            : component
              ? React.createElement(component, props)
              : render
                ? render(props)
                : null
          : typeof children === 'function'
            ? children(props)
            : null
      }}
    </RouterContext.Consumer>
  }
}
