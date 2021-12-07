import {all, takeEvery} from 'redux-saga/effects';
import * as products from './products';
import * as chats from './chats';
import {
  LOAD_PRODUCTS,
  LOAD_MORE_PRODUCTS,
  LOAD_PRODUCT,
  ADD_PRODUCT,
  LOAD_CHATS,
  ADD_CHAT,
} from '../constant';

export default function* rootSaga() {
  yield all([
    takeEvery(LOAD_PRODUCTS, products.loadProducts),
    takeEvery(LOAD_MORE_PRODUCTS, products.loadMoreProducts),
    takeEvery(LOAD_PRODUCT, products.loadProduct),
    takeEvery(ADD_PRODUCT, products.addProduct),
    takeEvery(LOAD_CHATS, chats.loadChats),
    takeEvery(ADD_CHAT, chats.addChat),
  ]);
}
