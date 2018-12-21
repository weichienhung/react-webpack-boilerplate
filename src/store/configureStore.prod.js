import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import appReducer from '../reducers';

const enhancer = compose(
  applyMiddleware(thunk),
);

export default function configureStore(initialState) {
  return createStore(appReducer, initialState, enhancer);
}
