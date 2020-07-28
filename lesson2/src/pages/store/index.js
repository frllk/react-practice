// import { createStore } from 'redux'
import { createStore } from '../kredux'

/**
 * 修改规则：累加器
 * @param {*} state 数据
 * @param {*} action 操作类型
 */
function countReducer (state = 0, action) {
  switch (action.type) {
    case "ADD":
      return state + 1;
    case "MINUS":
      return state - 1;
    default:
      return state;
  }
}

const store = createStore(countReducer)

export default store