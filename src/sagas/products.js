import {put, call} from 'redux-saga/effects';
import * as actions from '../actions';
import * as GraphQL from '../services/graphql';

export function* loadProducts({queryStringObj}) {
  try {
    const products = yield call(GraphQL.loadProducts, queryStringObj);
    yield put(actions.loadProductsSuccess(products));
  } catch (error) {
    console.log(error);
    yield put(actions.loadProductsFailure());
  }
}

export function* loadMoreProducts({queryStringObj}) {
  try {
    const products = yield call(GraphQL.loadProducts, queryStringObj);
    yield put(actions.loadMoreProductsSuccess(products));
  } catch (error) {
    yield put(actions.loadMoreProductsFailure());
  }
}

export function* loadProduct({id}) {
  try {
    const product = yield call(GraphQL.loadProduct, id);
    yield put(actions.loadProductSuccess(product));
  } catch (error) {
    console.log(error);
    yield put(actions.loadProductFailure());
  }
}

export function* addProduct({id, input}) {
  try {
    const product = yield call(GraphQL.addProduct, id, input);
    yield put(actions.addProductSuccess(product));
  } catch (error) {
    console.log(error);
    yield put(actions.addProductFailure(id));
  }
}
