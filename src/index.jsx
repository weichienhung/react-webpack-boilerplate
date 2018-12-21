import React from 'react';
import { render } from 'react-dom';
// Below is for redux
import { Provider } from 'react-redux';
import AppContainer from './containers/app_container';
import configureStore from './store/configureStore';
import DevTools from './components/devtool/devtool';

const store = configureStore();
let devtool;
if (process.env.NODE_ENV === 'development') {
  devtool = <DevTools />;
}

render(<Provider store={store}>
        <div>
          <AppContainer />
          {devtool}
        </div>
      </Provider>, document.getElementById('app'));


