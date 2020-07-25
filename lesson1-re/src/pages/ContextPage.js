/**
 * 组件跨层级通信 - Context
 */
import React, { Component } from 'react'
import HomePage from './HomePage'
import { ThemeProvider } from '../Context'




export default class ContextPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: {
        themeColor: "red"
      }
    }
  }
  render () {
    const { theme } = this.state
    return (
      <div>
        <h3>ContextPage</h3>
        {/* props传递：适合层级少 */}
        {/* <HomePage theme={this.state.theme} /> */}
        <ThemeProvider value={theme}>
          {/* 谁要接收这些组件，一定要包裹在Provider之内，一定得是它的子孙组件才可以 */}
          <HomePage />
        </ThemeProvider>
      </div>
    )
  }
}
