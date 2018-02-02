import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './components/App';

const appNode = document.getElementById('app');

const renderApp = Component => {
  render(
    <AppContainer>
      <Component />
    </AppContainer>,
    appNode
  );
}

if (appNode) {
  renderApp(App);
} else {
  console.log('Cannot find a node with id app to mount.');
}


// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/App', () => {
    renderApp(App);
  });
}


