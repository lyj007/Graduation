export default {
  namespace: 'first',
  state: {
    already: true,
    ss: [
      { name: 'ww', value: '12', children: [{ num: 'ee', value: '11'}]},
      { name: 'ww1', value: '12', children: [{ num: 'ee1', value: '112'}]}
    ]
  },
  reducers: {
    stateWillUpdate(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};