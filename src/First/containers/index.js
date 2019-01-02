import { connect } from 'dva';

import First from '../components/index';

const mapStateToProps = (state) => {
  return {
    ...state.first,
  };
};
const mapDispatchToProps = dispatch => ({
  dispatch,
});
export default connect(mapStateToProps, mapDispatchToProps)(First);