/**
 * 调用异步操作 call  
 * 状态更新 put  相当于dispatch
 * 做监听 take | takeEvery
 * 
 * saga与thunk相比：
 * thunk会形成回调地域问题
 * saga 都是按照同步的方式来写，不会遇到回调地域问题
 * 
 */
import {
  put,
  // takeEvery,
  call,
  take,
  fork
} from "redux-saga/effects";
import LoginService from "../service/login";

// watcher saga
function* loginHandle (action) {
  yield put({ type: 'REQUEST' })

  try {
    // 第一个异步请求
    const res1 = yield call(LoginService.login, action.payload)
    // 同步的方式  调用第二个请求，这个请求依赖于第一个请求的返回值
    const res2 = yield call(LoginService.getMoreUserInfo, res1)
    // 同步的方式   触发状态更新
    yield put({
      type: 'LOGIN_SUCCESS',
      payload: { ...res2 }
    })
  } catch (error) {
    yield put({
      type: 'LOGIN_FAILURE',
      payload: error
    })
  }
}
// workder saga

function* loginSaga () {
  yield takeEvery('LOGIN_SAGA', loginHandle)

  // take：只实现了一次监听

  /* while (true) {
    const action = yield take('LOGIN_SAGA')
    // call 是阻塞型调用  需要等前面的请求完成之后在进行下一次请求
    // ===> generator在调用结束之前不执行其他事情

    // yield call(loginHandle, action)
    // fork 非阻塞型调用
    // ===> 任务在后台启动  调用者可以继续自己的流程，不用等到fork任务结束

    yield fork(loginHandle, action)
    // 1s之后打印
    console.log('action', action);
  } */

}

// 自己实现takeEvery
const takeEvery = (pattern, saga, ...args) =>
  fork(function* () {
    while (true) {
      const action = yield take(pattern)
      yield fork(saga, ...args.concat(action))
    }
  })

export default loginSaga