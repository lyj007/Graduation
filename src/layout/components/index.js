import React from 'react';
// import 'antd/dist/antd.css';
// import $ from 'jquery';
import { Layout, Menu, Icon } from 'antd';
// import '../../assets/style/global.less';
import { Route, Switch, Link } from 'dva/router';
import Default from './default';
import First from '../../First/containers';
import Two from '../../two/containers';
import Three from '../../three/containers';
import { routerRedux } from 'dva/router';

const { Sider, Header } = Layout;
const { SubMenu } = Menu;
const SiderMenu = ({ already, dispatch }) => {
  if (already === false) {
    dispatch(routerRedux.push('/login'));
  }
  const SingOut = (e) => {
    e.preventDefault();
    dispatch({
      type: 'layout/singout',
      payload: {
        already: false,
      },
    });
    dispatch(routerRedux.push('/login'));
  };
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1">title</Menu.Item>
          <Menu.Item key="2" style={{ float: 'right'}}><Icon type="user" onClick={SingOut} style={{ fontSize: '24px'}} /></Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Sider
          width={200} style={{ background: '#fff' }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item key="1">
              <Link to="/home">首页</Link>
            </Menu.Item>
            <SubMenu key="sub1" title={<span><Icon type="user" />目录一</span>}>
              <Menu.Item key="2">
                <Link to="/first">option1</Link>
              </Menu.Item>
              <Menu.Item key="3">option2</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title={<span><Icon type="laptop" />目录二</span>}>
              <Menu.Item key="4">
                <Link to="/two">option6</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="5">
              <Link to="/three">目录三</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Switch>
            <Route path="/home" exact component={Default} />
            <Route path="/first" component={First} />
            <Route path="/two" component={Two} />
            <Route path="/three" component={Three} />
          </Switch>
        </Layout>
    </Layout>
  </Layout>
  );
};
export default SiderMenu;