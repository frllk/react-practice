import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useEffect } from 'react'

export default class RouteConponentPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }
  render () {
    const { count } = this.state
    return (
      <div>
        <h1>RouteConponentPage</h1>
        <button onClick={() => {
          this.setState({ count: count + 1 })
        }}>click change count {count}</button>
        <Router>
          {/* 渲染component的时候会调用React.createElement,如果使用下面这种匿名函数的形式，每次都会生成一个新的匿名函数，导致生成的组件的type总是不相同，这个时候会产生重复的卸载和挂载 */}

          {/* 错误示例：观察child的didMount和willUnmount函数 */}
          {/* <Route component={() => <Child count={count} />} /> */}
          <Route component={() => <FunctionChild count={count} />} />
          {/* 下面才是正确的示范： */}
          {/* 匹配的时候用render */}
          {/* <Route render={() => <Child count={count} />} /> */}
          {/* <Route children={() => <FunctionChild count={count} />} /> */}

          {/* children呢 */}
          {/* 不匹配的时候也需要渲染的话用children */}
          {/* <Route children={() => <Child count={count} />} /> */}
          {/* <Route children={() => <FunctionChild count={count} />} /> */}
        </Router>
      </div>
    )
  }
}
class Child extends Component {
  componentDidMount () {
    console.log('componentDidMount'); // sys-log
  }
  componentWillUnmount () {
    console.log('componentWillUnmount'); // sys-log
  }

  render () {
    return <div>child - {this.props.count}</div>
  }
}

function FunctionChild (props) {
  useEffect(() => {
    return () => {
      console.log('willUnmount')
    }
  }, [])
  return <div>child - {props.count}</div>
}