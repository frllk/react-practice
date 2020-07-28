/**
 * 使⽤Context
 * 创建Context => 获取Provider和Consumer => Provider提供值 => Consumer消费值
 * 范例：共享主题⾊
 */
import React, { Component } from 'react'
import { ThemeProvider, UserContext } from './Context'
import ContextTypePage from './ContextTypePage'
import ConsumerPage from './ConsumerPage'
import UserContextPage from './UserContextPage'

export default class ContextPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: {
        themeColor: 'red'
      },
      user: {
        name: 'xiaoming'
      }
    }
  }
  changeColor = () => {
    const { themeColor } = this.state.theme;
    this.setState({
      theme: {
        themeColor: themeColor === "red" ? "green" : "red"
      }
    });
  }
  render () {
    const { theme, user } = this.state
    return (
      <div>
        <h1>ContextPage</h1>
        <button onClick={this.changeColor}>change color</button>
        <ThemeProvider value={theme}>
          <ContextTypePage />
          <UserContext.Provider value={user}>
            <ConsumerPage />
            <UserContextPage />
          </UserContext.Provider>
        </ThemeProvider>
      </div>
    )
  }
}
