export default function createStore (reducer) {

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
