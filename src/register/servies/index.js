// import $ from 'jquery';
import Request from '../../utils/request';

const RegisterServies = {
  async fetch(params = {}) {
    return Request.post('Registers/register', params);
  },
};
export default RegisterServies;