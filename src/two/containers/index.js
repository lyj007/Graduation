import { connect } from 'dva';

import Two from '../components/index';

const mapStateToProps = (state) => {
  return {
    ...state.two,
  };
};
const mapDispatchToProps = dispatch => ({
  dispatch,
});
export default connect(mapStateToProps, mapDispatchToProps)(Two);