export default function applyMiddleware (...middlewares) {
  return createStore => reducer => {
    const store = createStore(reducer)
    let dispatch = store.dispatch
    // todo 加强dispatch
    // ===>根据中间件来做

    const midApi = {
      getState: store.getState,
      dispatch: (action, ...args) => dispatch(action, ...args)
    }
    // 让中间件挨个执行
    const middlewareChain = middlewares.map(middleware => middleware(midApi))

    // dispatch被加强了
    dispatch = compose(...middlewareChain)(store.dispatch)


    return {
      ...store,
      // 返回加强之后的dispatch
      dispatch
    }
  }
}

// 聚合函数
function compose (...funcs) {
  // 实现兼容性
  if (funcs.length === 0) {
    return args => args
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}