import * as React from 'react';
import styled from 'styled-components';

const RedDiv = styled.div`
  color: red;
`;

const App:React.FC = ():React.ReactElement =>  {
  return (
    <RedDiv>Hello World</RedDiv>
  );
}

export default App;