import React from 'react';
// import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
// import {
//   BrowserRouter as Router,
//   Route,
//   Link,
//   Switch,
//   useRouteMatch,
//   useHistory,
//   useLocation,
//   useParams,
//   withRouter,
//   Prompt
// } from "react-router-dom";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useRouteMatch,
  useHistory,
  useLocation,
  useParams,
  withRouter,
  Prompt
} from "./k-react-router-dom";

import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import _404Page from './pages/_404Page';


function App () {
  return (
    <div className="App">
      <Router>
        <Link to="/">首页</Link>
        <Link to="/user">用户中心</Link>
        <Link to="/login">登录</Link>
        <Link to="/product/123">商品</Link>
        {/* Switch：独占路由 渲染与该地址匹配的第一个子节点 <Route> 或者 <Redirect>。 */}
        {/* Switch：只跟第一个匹配上的渲染 */}
        <Switch>
          {/* Route渲染内容的三种方式 */}
          <Route
            exact
            path="/"
            // children={() => <div>children page</div>} // function 不管是否匹配，都会被渲染
            // component={HomePage} // 必须匹配的时候才会被渲染
            render={() => <div>render page</div>} // function 必须匹配的时候才会被渲染
          />
          <Route path="/user" component={UserPage} />
          <Route path="/login" component={LoginPage} />
          {/* <Route path="/product/:id" component={Product} /> */}
          <Route path="/product/:id" render={() => <Product />} />
          {/* Route：不加path，默认是可以匹配上的 */}
          <Route component={_404Page} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

// function Product ({ match }) {
function Product () {
  const match = useRouteMatch()
  const history = useHistory()
  const location = useLocation()
  const _params = useParams()
  console.log('hhh', match, history, location, _params); // sys-log
  console.log("match", match); //sy-log
  const { params, url } = match;
  const { id } = params;
  return (
    <div>
      <h1>Search-{id}</h1>
      <Link to={url + "/detail"}>详情</Link>
      <Route path={url + "/detail"} component={Detail} />
    </div>
  );
}
function Detail ({ match }) {
  return (
    <div>
      <h1>detail</h1>
    </div>
  );
}
