import React from 'react';
import {LocaleProvider} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { Router, Route, Switch } from 'dva/router';
import Layout from './layout/containers';
import Login from './login/containers';

function RouterConfig({ history }) {
  return (
    <LocaleProvider locale={zhCN}>
    <Router history={history}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={Layout} />
      </Switch>
    </Router>
  </LocaleProvider>
  );
}

export default RouterConfig;
