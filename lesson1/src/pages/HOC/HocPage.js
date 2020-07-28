import React, { Component } from "react";
import Button from 'antd/es/button'
import "antd/dist/antd.css"

// hoc: 是⼀个函数，接收⼀个组件，返回另外⼀个组件
//这⾥⼤写开头的Cmp是指function或者class组件
const foo = Cmp => props => {
  return (
    <div className="border">
      <Cmp {...props} />
    </div>
  );
};

const foo2 = Cmp => props => {
  return (
    <div className="greenBorder">
      <Cmp {...props} />
    </div>
  );
};

// const foo = Cmp => {
// return props => {
// return (
// <div className="border">
// <Cmp {...props} />
// </div>
// );
// };
// };

function Child (props) {
  return <div> Child {props.name}</div>;
}

const Foo = foo(Child);
// 链式调用
// const Foo = foo2(foo(foo(Child)));

@foo2
@foo
class HocPage extends Component {
  render () {
    return (
      <div>
        <h3>HocPage</h3>
        <Foo name="msg" />
        <Button type="primary">Button</Button>
      </div>
    );
  }
}
export default HocPage