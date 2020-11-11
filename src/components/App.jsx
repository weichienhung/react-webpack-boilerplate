import * as React from 'react';
import styled from 'styled-components';
const webpackLogo = require('../assets/images/webpack-logo.svg');

const RedDiv = styled.div`
  color: red;
`;

const App = () =>  {
  return (
    <RedDiv>
      <span>Hello World</span>
      <img src={webpackLogo} alt='logo'/>
    </RedDiv>
  );
}

export default App;