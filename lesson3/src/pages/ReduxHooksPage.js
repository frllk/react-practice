import React, { useCallback } from "react";
// import { useSelector, useDispatch } from 'react-redux'
import { useSelector, useDispatch } from '../kReactRedux'

export default function ReduxHooksPage (props) {
  // console.log('props', props); // sys-log
  // 获取状态值
  const count = useSelector(({ count }) => count)
  const dispatch = useDispatch()
  // useCallback:缓存
  const add = useCallback(() => {
    dispatch({ type: 'ADD' })
  }, []) // 依赖项： 跟谁都没有关系，只是执行dispatch
  return (
    <div>
      <h3>ReduxHooksPage</h3>
      <p>{count}</p>
      <button onClick={add} >add</button>
    </div>
  );
}
