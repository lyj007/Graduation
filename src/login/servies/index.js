// import $ from 'jquery';
import Request from '../../utils/request';

const LoginServies = {
  async fetch(params = {}) {
    return Request.post('Logins/login', params);
  },
};
export default LoginServies;