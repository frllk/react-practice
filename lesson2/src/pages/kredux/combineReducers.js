/**
 * combineReducers 辅助函数的作用是，把一个由多个不同 reducer 函数作为 value 的 object，
 * 合并成一个最终的 reducer 函数，然后就可以对这个 reducer 调用 createStore 方法。
 * 
 * 合并后的 reducer 可以调用各个子 reducer，并把它们返回的结果合并成一个 state 对象。 
 * 由 combineReducers() 返回的 state 对象，会将传入的每个 reducer 返回的 state 按其传递给 
 * combineReducers() 时对应的 key 进行命名。
 */

export default function combineReducers (reducers) {
  return function combination (state = {}, action) {
    let nextState = {}
    let hasChanged = false
    for (let key in reducers) {
      const reducer = reducers[key]
      nextState[key] = reducer(state[key], action)
      hasChanged = hasChanged || nextState[key] !== state[key]
    }
    hasChanged = hasChanged || Object.keys(nextState).length !== Object.keys(state).length
    return hasChanged ? nextState : state
  }
}
