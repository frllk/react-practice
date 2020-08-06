
export default {
  namespace: 'user',
  state: {
  },

  // 订阅
  subscriptions: {
    setup ({ dispatch, history }) {  // eslint-disable-line
      console.log('user subscriptions'); // sys-log
    },
  },

  // 副作用
  effects: {
    *fetch ({ payload }, { call, put }) {
      yield put({ type: 'save' });
    },
  },

  // 修改规则
  reducers: {
    save (state, action) {
      return { ...state, ...action.payload };
    },
  },

};
