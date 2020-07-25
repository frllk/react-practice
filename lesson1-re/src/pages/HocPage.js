/**
 * 高阶组件-HOC：：⾼阶组件是参数为组件，返回值为新组件的函数。
 */
import React, { Component, Children } from 'react'
import { render } from 'react-dom'


// hoc
// 是个函数，参数为组件，返回值也是组件
const foo = (Cmp) => props => {
  return <div className="border">
    <Cmp {...props} />
  </div>
}
/* function Child (props) {
  return <div className="border">Child-{props.name}</div>
}

// 高阶组件的使用及链式调用
const Foo = foo(foo(Child)) */


// 高阶组件装饰器写法
@foo
@foo
class Child extends Component {
  render () {
    return <div className="border">Child-{this.props.name}</div>
  }
}

export default class HocPage extends Component {
  render () {
    return (
      <div>
        <h3>HocPage</h3>
        {/* <Foo /> */}
        <Child />
      </div>
    )
  }
}
