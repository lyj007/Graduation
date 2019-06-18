import React from 'react';
import { Form, Input, Button, Icon} from 'antd';
import { routerRedux} from 'dva/router';

const Register = ({ form, dispatch, already }) => {
  const {getFieldDecorator} = form;
  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, value) => {
      if (!err) {
        dispatch({
          type: 'register/fetch',
          payload: {
            ...value,
            already,
          },
        });
      }
    });
    dispatch(routerRedux.push('/home'));
  };
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(routerRedux.push('/login'));
  }
  return (
    <div style={{ display: 'flex',height: '300px',justifyContent: 'center', alignContent: 'center'}}>
    <div style={{ width: '500px', height: '600px', border: '1px solid grey', boxShadow: '2px 0px 2px 0px', textAlign: 'center'}}>
      <Form style={{ padding: '30px'}}>
        <Form.Item>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your password !' }],
          })(
            <Input type="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="password" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('againpass', {
            rules: [{ required: true, message: 'Please input your password again !' }],
          })(
            <Input type="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="againpass" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('telephone', {
            rules: [{ required: true, message: 'Please input your telephone !' }],
          })(
            <Input prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="telephone" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('address', {
            rules: [{ required: true, message: 'Please input your address !' }],
          })(
            <Input prefix={<Icon type="calendar" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="address" />
          )}
        </Form.Item>
        <Button onClick={handleSubmit} type="primary" style={{ width: '100%'}}>注册</Button>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px'}}>
          <a onClick={handleClick}>登录</a>
        </div>
      </Form>
    </div>
   </div>
  );
};
export default Form.create()(Register);