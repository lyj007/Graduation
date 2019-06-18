import LoginServies from '../servies/index';
import { routerRedux } from 'dva/router';
import { delay} from 'redux-saga';

export default {
  namespace: 'login',
  state: {
    already: false,
    flag: false,
    loading: false,
    ss: [
      { name: 'ww', value: '12', children: [{ num: 'ee', value: '11'}]},
      { name: 'ww1', value: '12', children: [{ num: 'ee1', value: '112'}]},
      // { name: 'ww1', value: '12', children: [{ num: 'ee1', value: '1124'}]},
    ],
    all: [
      { name: 'ww', value: '12', children: [{ num: 'ee', value: '11'}]},
      { name: 'ww1', value: '12', children: [{ num: 'ee1', value: '112'}]},
    ],
  },
  reducers: {
    stateWillUpDate(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
    changeState(state, { payload}) {
      return {
        ...state,
        ...payload,
      }
    },
  },
  effects: {
    *fetch({payload}, { call, put}) {
      yield put({
        type: 'stateWillUpDate',
          payload: {
            loading: true,
          }
      })
      const response = yield call(LoginServies.fetch, payload);
      if (response.status === 200) {
        yield call(delay, 100);
        yield put(routerRedux.push('/home'));
        yield put({
          type: 'stateWillUpDate',
          payload: {
            already: true,
            loading: false,
          }
        });
      }
    },
    *change({payload}, { put}) {
      yield put({
        type: 'register/changeState',
        payload,
      });
      yield put({
        type: 'layout/changeState',
        payload,
      })
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/login') {
          // dispatch({
          //   type: 'fetch',
          // });
        }
      });
    },
  },
}