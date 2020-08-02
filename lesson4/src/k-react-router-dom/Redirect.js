import React, { Component } from 'react'
import { RouterContext } from './Context'

export default class Redirect extends Component {
  render () {
    return (
      <RouterContext.Consumer>
        {
          (context) => {
            console.log('context', context); // sys-log
            const { history } = context
            const { to, push = false } = this.props

            return <LifeCycle onMount={() => {
              push ? history.push(to) : history.replace(to)
            }} />
          }
        }
      </RouterContext.Consumer>
    )
  }
}

class LifeCycle extends Component {
  state = {}
  componentDidMount () {
    if (this.props.onMount) {
      this.props.onMount.call(this, this)
    }
  }
  render () { return null }
}