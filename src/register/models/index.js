import RegisterServies from '../servies/index';
import { routerRedux } from 'dva/router';
export default {
  namespace: 'register',
  state: {},
  reducers: {
    stateWillUpDate(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    *fetch({payload}, { call, put}) {
      const { name, password, againpass, telephone, address, already} = payload;
      const response = yield call(RegisterServies.fetch, {
        name,
        password,
        againpass,
        address,
        telephone,
      });
      if (response.status === 200) {
        yield put(routerRedux.push('/home'));
        yield put({
          type: 'login/changeState',
          payload: already,
        });
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/register') {
          // dispatch({
          //   type: 'fetch',
          // });
        }
      });
    },
  },
}