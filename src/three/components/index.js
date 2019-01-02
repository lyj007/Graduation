import React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;
export default () => {
  return (
    <React.Fragment>
    <Content style={{
      background: '#fff', padding: 24, margin: 0, minHeight: 280,
    }}
    >
      Three
    </Content>
    </React.Fragment>
  );
};