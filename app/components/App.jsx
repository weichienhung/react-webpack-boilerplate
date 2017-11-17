import React, { PropTypes } from 'react';
import moment from 'moment';

require('../stylesheets/app.scss');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        Hello world   
      </div>
    );
  }
}

export default App;
