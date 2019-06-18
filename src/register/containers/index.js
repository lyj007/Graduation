import { connect } from 'dva';

import Register from '../components/index';

const mapStateToProps = (state) => {
  return {
    ...state.register,
    already: state.login.already,
  };
};
const mapDispatchToProps = dispatch => ({
  dispatch,
});
export default connect(mapStateToProps, mapDispatchToProps)(Register);