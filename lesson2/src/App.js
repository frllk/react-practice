import React from 'react';
import ReduxPage from './pages/ReduxPage';

function App () {
  return (
    <div className="App">
      <ReduxPage />
    </div>
  );
}
const array1 = [1, 2, 3, 4];
const reducer = (accumulator, currentValue) => accumulator + currentValue;
/* // 1 + 2 + 3 + 4
console.log(array1.reduce(reducer));
// expected output: 10
// 5 + 1 + 2 + 3 + 4
console.log(array1.reduce(reducer, 5));
// expected output: 15 */

/* function f1 (arg) {
  console.log("f1", arg);
  return arg;
}
function f2 (arg) {
  console.log("f2", arg);
  return arg;
}
function f3 (arg) {
  console.log("f3", arg);
  return arg;
}

// let res = f1(f2(f3('omg')))
// console.log('res', res); // sys-log

// 有一个神奇的函数compose，可接收多个参数，希望他们都执行
// ===>compose执行之后返回的参数值是一个函数，在接收参数omg并执行
let res = compose()('omg')
console.log('res', res); // sys-log

function compose (...funcs) {
  // 实现兼容性
  if (funcs.length === 0) {
    return args => args
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
} */

export default App;
