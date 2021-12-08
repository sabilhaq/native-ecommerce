import React from 'react';
import createSagaMiddleware from 'redux-saga';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import rootReducer from './reducers';
import rootSaga from './sagas';
import ProductBox from './components/ProductBox';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

function App() {
  return (
    <Provider store={store}>
      <ProductBox />
    </Provider>
  );
}

export default App;
