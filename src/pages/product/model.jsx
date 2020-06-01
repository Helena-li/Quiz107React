import { queryFakeProduct,removeFakeProduct,addFakeProduct,updateFakeProduct } from './service';


const Model = {
  namespace: 'productList',
  state:{
    productData: [],
  },
  effects: {
    *fetch(_, { call, put }) {
      console.log("fetch")
      const response = yield call(queryFakeProduct);
      yield put({
        type: 'queryProduct',
        payload: Array.isArray(response) ? response : [],
      });
    },

    *submit({ payload }, { call, put }) {
      console.log(payload)
      Object.keys(payload).length
      let callback;
      if (payload.id) {
        callback = Object.keys(payload).length === 1 ? removeFakeProduct : updateFakeProduct;
      } else {
        callback = addFakeProduct;
      }
      const response = yield call(callback, payload); // post

      yield put({
        type: 'queryProduct',
        payload: response,
      });
    },

  },
  reducers: {
    queryProduct(state, action) {
      console.log(action.payload)
      return { ...state, productData:action.payload };
    },

  },
};
export default Model;
