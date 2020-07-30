// import { createStore, applyMiddleware } from 'redux'
import { createStore, applyMiddleware, combineReducers } from '../kredux'
// import thunk from 'redux-thunk'
// import logger from 'redux-logger'
// import promise from 'redux-promise'
import isPromise from 'is-promise';

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

// const store = createStore(
//   countReducer,
//   applyMiddleware(thunk, logger, promise)
// )
const store = createStore(
  countReducer,
  // ! 课后补充： combineReducers用法
  // combineReducers({home: countReducer}),
  applyMiddleware(thunk, logger, promise)
);
export default store

/**
 * logger中间件
 * @param {*} param0 
 */
function logger ({ getState }) {
  // next: 每一次聚合返回的函数
  return next => action => {
    console.log("%c%s", "color: red; background: greenyellow; ", '********************************************'); // sys-log
    let prevState = getState()
    console.log("%c%s", "color: #999;font-weight:700", 'prev state', prevState); // sys-log

    console.log("%c%s", "color: skyblue;font-weight:700 ", 'action', action); // sys-log

    const returnValue = next(action)
    let nextState = getState()
    // console.log("%c%s", "color: red; background: yellow; font-size: 24px;", "警告！");
    console.log("%c%s", "color: green;font-weight:700 ", 'next state', nextState); // sys-log
    console.log("%c%s", "color: red; background: yellow; ", '********************************************'); // sys-log
    return returnValue
  }
}


// next就是聚合函数
/**
 * thunk中间件
 * @param {*} param0 
 */
function thunk ({ dispatch, getState }) {
  return next => action => {
    if (typeof action === "function") {
      return action(dispatch, getState)
    } else {
      return next(action)
    }
  }
}

/**
 * promise中间件
 * @param {*} param0 
 */
function promise ({ dispatch }) {
  return next => action => {
    return isPromise(action) ? action.then(dispatch) : next(action);
  };
}
