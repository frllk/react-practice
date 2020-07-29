/**
 * Effect Hook 可以让你在函数组件中执⾏副作⽤操作。
 * 数据获取，设置订阅以及⼿动更改 React 组件中的 DOM 都属于副作⽤。
 */

import React, { useState, useEffect } from "react";

export default function HookPage (props) {
  // 声明⼀个叫 “count” 的 state 变量，初始化为0
  const [count, setCount] = useState(0);
  // 与 componentDidMount 和 componentDidUpdate相似
  useEffect(() => {
    // 更新 title
    document.title = `You clicked ${count} times`;
    console.log(`You clicked ${count} times`); // sys-log
  });
  return (
    <div>
      <h3>HookPage</h3>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>add</button>
    </div>
  );
}