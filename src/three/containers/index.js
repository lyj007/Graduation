import { connect } from 'dva';

import Three from '../components/index';

const mapStateToProps = (state) => {
  return {
    ...state.three,
  };
};
const mapDispatchToProps = dispatch => ({
  dispatch,
});
export default connect(mapStateToProps, mapDispatchToProps)(Three);