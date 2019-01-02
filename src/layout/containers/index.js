import { connect } from 'dva';

import SiderMenu from '../components/index';

const mapStateToProps = (state) => {
  return {
    ...state.layout,
  };
};
const mapDispatchToProps = dispatch => ({
  dispatch,
});
export default connect(mapStateToProps, mapDispatchToProps)(SiderMenu);