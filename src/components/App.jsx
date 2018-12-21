import React from 'react';
import { hot } from 'react-hot-loader';

import styled from 'styled-components';

const Mybtn = styled.button`
  color: red;
`;

export default
@hot(module)
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
  }

  onClick() {
    this.props.counterAdd({});
  }

  render() {
    return (
      <div>
        {this.props.counter.loaded && this.props.counter.count}
        {!this.props.counter.loaded && 'loading' }
        <Mybtn
          onClick={this.onClick}
        >Clickme</Mybtn>
        &nbsp;
      </div>
    );
  }
}
