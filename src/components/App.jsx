import React from 'react';
import { hot } from 'react-hot-loader';

import styled from 'styled-components';

const HelloWorld = styled.div`
  color: red;
`;

export default
@hot(module)
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <HelloWorld>Hello World</HelloWorld>
    );
  }
}
