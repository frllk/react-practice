/**
 * 实现kReactRedux
 */
import React, { useContext, useEffect, useReducer, useLayoutEffect } from 'react'

const Context = React.createContext()

// Provider在index.js，把store传递下来，用到了context
// 所有的子组件都有机会接收到store 


function bindActionCreator (creator, dispath) {
  return (...args) => dispath(creator(...args))
}

export function bindActionCreators (creators, dispatch) {
  const obj = {}
  for (let key in creators) {
    obj[key] = bindActionCreator(creators[key], dispatch)
  }
  return obj
}

// 提供者 提供state 因为 store当中有state（数据） dispatch（派发事件 ） subscribe（订阅，store中的state数据发生变化之后，要通知组件）
export function Provider ({ store, children }) {
  return <Context.Provider value={store}>{children}</Context.Provider>
}

// 原理是高阶组件
export const connect = (
  mapStateToProps = state => state,
  mapDispatchToProps
) => WrappedComponent => props => {
  // 读取store state
  const store = useContext(Context)
  const { getState, dispatch, subscribe } = store
  const stateProps = mapStateToProps(getState())

  let dispatchProps = { dispatch }

  if (typeof mapDispatchToProps === 'function') {
    dispatchProps = mapDispatchToProps(dispatch)
  } else if (typeof mapDispatchToProps === 'object') {
    dispatchProps = bindActionCreators(mapDispatchToProps, dispatch)
  }


  // 自己实现一个forceUpdate：实现了函数组件版本的forceUpdate，可参考官网
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0)

  // useEffect 有延迟， useLayoutEffect 同步
  // useEffect相当于3个生命周期的结合：componentDidMount componentDidUpdate componentWillUnmount
  useLayoutEffect(() => {
    const unsubscribe = subscribe(() => {
      // store state发生改变  forceUpdate 强制更新
      forceUpdate()
    })
    // 有订阅 ===> 取消订阅
    return () => {
      // 函数卸载
      if (unsubscribe) { unsubscribe() }
    }
  }, [store]) // store：依赖项，当store发生改变的时候执行

  return <WrappedComponent {...props} {...stateProps} {...dispatchProps} />
}

// 以下是hook方法
export function useSelector (selector) {
  const store = useStore()
  const { getState, subscribe } = store


  // 自己实现一个forceUpdate：实现了函数组件版本的forceUpdate，可参考官网
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0)

  // useEffect 有延迟， useLayoutEffect 同步
  // useEffect相当于3个生命周期的结合：componentDidMount componentDidUpdate componentWillUnmount
  useLayoutEffect(() => {
    const unsubscribe = subscribe(() => {
      // store state发生改变  forceUpdate 强制更新
      forceUpdate()
    })
    // 有订阅 ===> 取消订阅
    return () => {
      // 函数卸载
      if (unsubscribe) { unsubscribe() }
    }
  }, [store]) // store：依赖项，当store发生改变的时候执行


  const selectedState = selector(getState())

  return selectedState
}
export function useDispatch () {
  const store = useStore()
  return store.dispatch
}

function useStore () {
  const store = useContext(Context)
  return store
}