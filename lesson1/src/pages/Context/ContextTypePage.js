import React, { Component } from 'react'
import { ThemeContext } from './Context'

class ContextTypePage extends Component {
  // static contextType = ThemeContext
  render () {
    // console.log(this)
    const { themeColor } = this.context
    return (
      <div className="border">
        <h3 className={themeColor}>ContextTypePage</h3>
      </div>
    )
  }
}

ContextTypePage.contextType = ThemeContext

export default ContextTypePage