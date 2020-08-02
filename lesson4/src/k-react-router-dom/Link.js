/**
 * Link：本质是a标签
 */
import React, { Component } from 'react'
import { RouterContext } from './Context';

export default class Link extends Component {

  static contextType = RouterContext

  // todo 禁掉原先的行为 a标签的跳转 ===> 禁止默认行为，改为事件跳转 ===> 路由切换了，但是对应组件还没有切换...
  handleClick = (event) => {
    event.preventDefault()
    // 事件做跳转
    // history.push(this.props.to) //  Unexpected use of 'history'  no-restricted-globals
    // console.log('this.context', this.context); // sys-log
    this.context.history.push(this.props.to)
  }
  render () {
    // console.log('link-props', this.props); // sys-log
    const { to, children, ...restProps } = this.props
    return <a href={to} {...restProps} onClick={this.handleClick}>{children}</a>
  }
}
