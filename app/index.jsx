import React from 'react';
import { render } from 'react-dom';

import App from './components/App'

const appNode = document.getElementById('app');

if (appNode) {
  render(
    <App/>,
    appNode
  );
} else {
  console.log('Cannot find a node with id app to mount.');
}




