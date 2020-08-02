import React from 'react'
import { RouterContext } from "./Context";
export default function Prompt ({ message, when = true }) {
  return (
    <RouterContext.Consumer>
      {
        (context) => {
          if (!when) {
            return null
          }
          let method = context.history.block
          return (
            <LifeCycle
              onMount={self => {
                if (self.unblock) self.unblock();
                self.unblock = method(message)
              }}
              onUnmount={self => {
                if (self.unblock) {
                  self.unblock();
                  self.unblock = null;
                }
              }}
            />
          )
        }
      }
    </RouterContext.Consumer>
  )
}

class LifeCycle extends React.Component {
  componentWillReceiveProps (nextProps) {
    if (nextProps.when) {
      if (!this.props.when || this.props.message !== nextProps.message) {
        if (this.unblock) this.unblock();
        this.unblock = this.context.router.history.block(nextProps.message);
      }
    } else {
      if (this.unblock) {
        this.unblock();
        this.unblock = null;
      }
    }
  }
  componentDidMount () {
    if (this.props.onMount) {
      this.props.onMount.call(this, this)
    }
  }
  componentWillUnmount () {
    if (this.props.onUnmount) {
      this.props.onUnmount.call(this, this)
    }
  }
  render () { return null }
} 