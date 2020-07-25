/**
 * Class.contextType方式获取数据
 */
import React, { Component } from 'react'
import { ThemeContext } from '../Context';
import UserPage from './UserPage';

class HomePage extends Component {
  constructor(props) {
    super(props)
  }
  // Context API： Class.contextType 直接挂载在这个类上
  // static contextType = ThemeContext

  render () {
    // props方式传值
    // const { themeColor } = this.props.theme
    const { themeColor } = this.context
    // console.log('this', this);
    return (
      <div>
        <h3 style={{ color: themeColor }}>HomePage</h3>
        <UserPage />
      </div>
    )
  }
}
HomePage.contextType = ThemeContext
export default HomePage
