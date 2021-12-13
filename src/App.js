import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import createSagaMiddleware from 'redux-saga';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import rootReducer from './reducers';
import rootSaga from './sagas';
import ProductBox from './components/ProductBox';
import Login from './components/Login';
import ProductDetail from './components/ProductDetail';
import ProductForm from './components/ProductForm';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={ProductBox} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Detail" component={ProductDetail} />
          <Stack.Screen name="Add" component={ProductForm} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
