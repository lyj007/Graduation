// import $ from 'jquery';
import Request from '../../utils/request';

const LayoutServies = {
  async list(params = {}) {
    return Request.post('Laws/select', params);
  },
};
export default LayoutServies;