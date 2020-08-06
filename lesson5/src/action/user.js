import LoginService from "../service/login";

// export const login = () => ({ type: "LOGIN_SUCCESS" });
export const login = userInfo => ({ type: "LOGIN_SAGA", payload: userInfo });


/* // async  await 方式实现
export const login = (userInfo) => {
  return async function (dispatch) {
    // 先去进行异步请求
    const res1 = await loginPromise(dispatch, userInfo)
    if (res1) {
      getMoreUserInfo(dispatch, res1)
    }
    // 把状态存下来
  }
} */

const loginPromise = (dispatch, userInfo) => {
  return LoginService.login(userInfo).then(
    res => {
      return res
    },
    err => {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: err
      })
    })
}

/* // 登录成功之后，获取用户信息  ===> 保证第一个请求成功的基础上去请求第二个 ===> 嵌套 ===> 形成回调地域
// 用thunk处理异步
export const login = (userInfo) => dispatch => {
  // 先去进行异步请求
  // 把状态存下来
  LoginService.login(userInfo).then(res => {
    // dispatch({
    //   type: 'LOGIN_SUCCESS',
    //   payload: {
    //     ...res
    //   }
    // })
    getMoreUserInfo(dispatch, res)
  }, err => {
    dispatch({
      type: 'LOGIN_FAILURE',
      payload: err
    })
  })
}
*/


const getMoreUserInfo = (dispatch, userInfo) => {
  return LoginService.getMoreUserInfo(userInfo).then(res => {
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: {
        ...res
      }
    })
  })
} 