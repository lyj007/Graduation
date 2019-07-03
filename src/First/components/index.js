import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Icon } from 'antd';

const { Content } = Layout;
const First = ({ ss, dipatch }) => {
console.log('---');
  return (
    <React.Fragment>
    <Content style={{
      background: '#fff', padding: 24, margin: 0, minHeight: 280,
    }}
    >
    cdcfvfv
      {/* <ul>
        {
          ss.map((item, index) => {
            return (
              <li key={index} style={{ marginTop: '10px' }}> {item.name} <Icon type="delete" /></li>
            );
          })
        }
      </ul> */}
    </Content>
    </React.Fragment>
  );
};

export default First;