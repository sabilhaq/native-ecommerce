import {combineReducers} from 'redux';
import products from './products';
import chats from './chats';

export default combineReducers({
  products,
  chats,
});
