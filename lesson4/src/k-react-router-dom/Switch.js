/**
 * Switch里面是Route或者Redirect，遍历这些内容，找到第一个匹配的，把这个组件渲染出来即可
 * 组件复合
 */
import React, { Component } from 'react'
import { RouterContext } from './Context'
import { matchPath } from 'react-router-dom';

export default class Switch extends Component {
  render () {
    return <RouterContext.Consumer>
      {(context) => {
        // console.log('context', context); // sys-log
        // 判断是否匹配 location 
        // 看： 是单个的对象，或者多个的对象数组
        // match: 是否匹配  element：记录匹配的元素
        let match, element
        const { location } = context
        // React.Children 提供了用于处理 this.props.children 不透明数据结构的实用方法。
        React.Children.forEach(this.props.children, child => {
          if (match == null && React.isValidElement(child)) {
            // 还没有匹配上，并且当前child是一个有效的元素
            element = child
            const { path } = child.props
            match = path ? matchPath(location.pathname, child.props) : context.match
          }
        })
        // 这里的match比Route里的match优先级要高
        return match
          ? React.cloneElement(element, {
            // children: 不管是否匹配，都要渲染，但是外面加了Switch之后，Switch会改变原先的规则，但是不能在Route中去改变，在Switch中改变。在外面包一层Switch（独占路由），必须返回匹配的Route或者是Redirect，必须是匹配的
            computedMatch: match
          })
          : null
      }}
    </RouterContext.Consumer>
  }
}
