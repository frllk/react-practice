import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import ExamplePage from './routes/ExamplePage';
import UserPage from './routes/UserPage';
import { UserPageDynamic, ExampleDynamic } from './dynamic'

function RouterConfig ({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/example" exact component={ExampleDynamic} />
        <Route path="/user" exact component={UserPageDynamic} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
