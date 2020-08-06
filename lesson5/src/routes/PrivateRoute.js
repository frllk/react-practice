import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'

export default connect(
  // mapStateToProps
  ({ user }) => ({ isLogin: user.isLogin })
)(function PrivateRoute ({ isLogin, component: Component, ...rest }) {
  // path在rest中  render：跳转到哪儿   component: Component 组件必须大写
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin
          ? (<Component {...props} />)
          : (<Redirect to={{ pathname: '/login', state: { from: props.location.pathname } }} />) // state：记录当前从哪里来
      } />
  )
})