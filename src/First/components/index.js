import React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;
const First = () => {
  return (
    <React.Fragment>
    <Content style={{
      background: '#fff', padding: 24, margin: 0, minHeight: 280,
    }}
    >
      first
    </Content>
    </React.Fragment>
  );
};

export default First;