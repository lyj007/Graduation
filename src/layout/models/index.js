import LayoutServies from '../servies';

export default {
  namespace: 'layout',
  state: {
    haslogin: false,
    collapsed: false,
    data: [],
    list: {},
    already: true,
  },
  reducers: {
    stateWillUpDate(state, {payload}) {
      return {
        ...state,
        ...payload,
      }
    },
  },
  effects: {
    *singout({payload}, {put}) {
      yield put({
        type: 'login/changeState',
        payload,
      })
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/') {
          // dispatch({
          //   type: 'fetch',
          //   payload: {
          //     array: [1,2,3].join(','),
          //     price: 200,
          //   },
          // });
        }
      });
    },
  },
};