import {
  LOAD_PRODUCTS,
  LOAD_PRODUCTS_SUCCESS,
  LOAD_PRODUCTS_FAILURE,
  LOAD_PRODUCT,
  LOAD_PRODUCT_SUCCESS,
  LOAD_PRODUCT_FAILURE,
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILURE,
  // REMOVE_PRODUCT,
  // REMOVE_PRODUCT_SUCCESS,
  // REMOVE_PRODUCT_FAILURE,
  LOAD_MORE_PRODUCTS,
  LOAD_MORE_PRODUCTS_SUCCESS,
  LOAD_MORE_PRODUCTS_FAILURE,
  LOAD_CHATS_SUCCESS,
  LOAD_CHATS_FAILURE,
  LOAD_CHATS,
  ADD_CHAT_DRAWING,
  ADD_CHAT_SUCCESS,
  ADD_CHAT_FAILURE,
  ADD_CHAT,
} from '../constant';

export const loadProductsSuccess = products => ({
  type: LOAD_PRODUCTS_SUCCESS,
  products,
});

export const loadProductsFailure = () => ({
  type: LOAD_PRODUCTS_FAILURE,
});

export const loadProducts = queryStringObj => ({
  type: LOAD_PRODUCTS,
  queryStringObj,
});

export const loadProductSuccess = product => ({
  type: LOAD_PRODUCT_SUCCESS,
  product,
});

export const loadProductFailure = () => ({
  type: LOAD_PRODUCT_FAILURE,
});

export const loadProduct = id => ({
  type: LOAD_PRODUCT,
  id,
});

export const addProductSuccess = product => ({
  type: ADD_PRODUCT_SUCCESS,
  product,
});

export const addProductFailure = id => ({
  type: ADD_PRODUCT_FAILURE,
  id,
});

export const addProduct = (id, input) => ({
  type: ADD_PRODUCT,
  id,
  input,
});

export const loadMoreProducts = queryStringObj => ({
  type: LOAD_MORE_PRODUCTS,
  queryStringObj,
});

export const loadMoreProductsSuccess = products => ({
  type: LOAD_MORE_PRODUCTS_SUCCESS,
  products,
});

export const loadMoreProductsFailure = () => ({
  type: LOAD_MORE_PRODUCTS_FAILURE,
});

// export const removeProductSuccess = (id) => ({
//   type: REMOVE_PRODUCT_SUCCESS,
//   id,
// });

// export const removeProductFailure = () => ({
//   type: REMOVE_PRODUCT_FAILURE,
// });

// export const removeProduct = (id) => ({
//   type: REMOVE_PRODUCT,
//   id,
// });

export const loadChatsSuccess = chats => ({
  type: LOAD_CHATS_SUCCESS,
  chats,
});

export const loadChatsFailure = () => ({
  type: LOAD_CHATS_FAILURE,
});

export const loadChats = param => ({
  type: LOAD_CHATS,
  param,
});

export const drawAddChat = (id, content) => ({
  type: ADD_CHAT_DRAWING,
  id,
  content,
});

export const addChatSuccess = (oldId, chat) => ({
  type: ADD_CHAT_SUCCESS,
  oldId,
  chat,
});

export const addChatFailure = id => ({
  type: ADD_CHAT_FAILURE,
  id,
});

export const addChat = input => ({
  type: ADD_CHAT,
  input,
});
