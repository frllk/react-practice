// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import './index.css'
import React from './kreact/index';
import ReactDOM from './kreact/react-dom';
import Component from './kreact/Component'

class ClassComponent extends Component {
  static defaultProps = {
    color: 'pink'
  }
  render () {
    return (
      <div className="border">
        class组件-{this.props.name}
        <p className={this.props.color}>omg</p>
      </div>
    )
  }
}

function FunctionComponent (props) {
  return <div className="border">函数组件组件-{props.name}</div>
}

const jsx = (
  <div className="border">
    <p>全栈</p>
    <a href="https://www.kaikeba.com/">开课吧</a>
    {/* 类组件 */}
    {/* <ClassComponent name="class" color="green" /> */}
    {/* 函数组件 */}
    {/* <FunctionComponent name="function" /> */}
    {/* <>
      <h1>aaa</h1>
      <h1>bbb</h1>
    </> */}
    {/* {
      // 这样写外面会多一层div，源码中使用React.Fragment解决
      // [1, 2].map(item => <div key={item}>{item}</div>)
      [1, 2].map(item => <React.Fragment key={item}>{item}</React.Fragment>)
    } */}
  </div>
);

ReactDOM.render(
  jsx, // jsx 虚拟dom对象
  document.getElementById('root')
);
// 文本节点
// html元素节点
// 类组件
// 函数组件
// Fragment
// 数组
// 补充： <></>与Fragment的区别