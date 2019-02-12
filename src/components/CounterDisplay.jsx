import React from 'react';
import styled from 'styled-components';
import { withCounter } from '../context';

const Mybtn = styled.button`
  color: red;
`;

let CounterDisplay = ({ counter }) => 
  (<React.Fragment>
    { counter.loaded && counter.count }
    { !counter.loaded && 'loading' }
    <Mybtn
      onClick={counter.inc}
    >Clickme</Mybtn>
  </React.Fragment>)


CounterDisplay = withCounter(CounterDisplay);
export default CounterDisplay;