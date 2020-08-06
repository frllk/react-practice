import { getProductData } from '../services/product'

export default {

  // 当前唯一state的key值
  namespace: 'example',

  state: {
    data: [],
    pageSize: 10,
    current: 1,
    total: 0
  },

  // 订阅
  subscriptions: {
    setup ({ dispatch, history }) {  // eslint-disable-line
    },
  },

  // 副作用
  effects: {
    // *fetch ({ payload }, { call, put }) {  // eslint-disable-line
    //   yield put({ type: 'save' });
    // },
    *getProductData ({ payload }, { call, put }) {  // eslint-disable-line
      const res = yield call(getProductData, payload)
      yield put({ type: 'productData', payload: res.data })
    },
  },

  // 修改规则
  reducers: {
    // save (state, action) {
    //   return { ...state, ...action.payload };
    // },
    productData (state, action) {
      return { ...state, data: action.payload.data };
    }
  },

};
