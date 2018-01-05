import { combineReducers, applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import products from './products';

const reducers = combineReducers({
  products
});

const middleware = applyMiddleware(promise(), thunk, logger);
const store = createStore(reducers, middleware);

export default store;