import React from 'react';
import styled from 'styled-components';

const HelloWorld = styled.div`
  color: red;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    return (
      <HelloWorld>Hello World</HelloWorld>
    );
  }
}

export default App;
