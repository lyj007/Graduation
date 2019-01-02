import React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;
export default ({ data }) => {
  console.log('data===', data);
  return (
    <React.Fragment>
    <Content style={{
      background: '#fff', padding: 24, margin: 0, minHeight: 280,
    }}
    >
      <p>{data}</p>
    </Content>
    </React.Fragment>
  );
};