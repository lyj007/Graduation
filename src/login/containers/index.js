import { connect } from 'dva';

import Login from '../components/index';

const mapStateToProps = (state) => {
  return {
    ...state.login,
  };
};
const mapDispatchToProps = dispatch => ({
  dispatch,
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);