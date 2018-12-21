import { applyMiddleware, createStore, compose } from 'redux';
import { persistState } from 'redux-devtools';
import thunk from 'redux-thunk';
import appReducer from '../reducers';
import DevTools from '../components/devtool/devtool';

const enhancer = compose(
  applyMiddleware(thunk),
  DevTools.instrument(),
  persistState(
    window.location.href.match(
      /[?&]debug_session=([^&#]+)\b/
    )
  )
);

export default function configureStore(initialState) {
  const store = createStore(appReducer, initialState, enhancer);

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers')/*.default if you use Babel 6+ */)
    );
  }
  return store;
}
