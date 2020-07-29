export default function createStore (reducer, enhancer) {
  if (enhancer) {
    // 加强 enhancer
    // 原版dispatch只能接受普通对象，加强之后变强大，可以处理多种形式，如callback、promise等
    return enhancer(createStore)(reducer)
  }


  let currentState;
  let currentlistener = []

  function getState () {
    return currentState
  }
  function dispatch (action) {
    currentState = reducer(currentState, action)
    currentlistener.forEach(listener => listener())
  }
  function subscribe (listener) {
    currentlistener.push(listener)
    // 组件没有了，订阅还存在===>加下面代码进行移除注销
    return () => {
      currentlistener = []
    }
  }

  dispatch({ type: 'REDUX/KKB' })

  return {
    getState, // 获取状态
    dispatch, // 触发改变state
    subscribe // 订阅
  }
}
