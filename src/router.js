import React from 'react';
import {LocaleProvider} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { Router, Route, Switch } from 'dva/router';
import Layout from './layout/containers';
import Login from './login/containers';
import Register from './register/containers';

// console.log('----', window.localStorage.getItem('auth'));
// console.log('----window', window.location.hash);
function RouterConfig({ history }) {
  return (
    <LocaleProvider locale={zhCN}>
    <Router history={history}>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/home" component={Layout} />
        <Route path="/register" component={Register} />
      </Switch>
    </Router>
  </LocaleProvider>
  );
}

export default RouterConfig;
