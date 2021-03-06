import { connect } from 'dva';

import SiderMenu from '../components/index';

const mapStateToProps = (state) => {
  return {
    ...state.layout,
    already: state.login.already,
  };
};
const mapDispatchToProps = dispatch => ({
  dispatch,
});
export default connect(mapStateToProps, mapDispatchToProps)(SiderMenu);