import React from 'react';
import { hot } from 'react-hot-loader';
import CounterDisplay from './CounterDisplay';
import { Provider } from '../context';

export default
@hot(module)
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: {
        count: 0,
        loaded: true,
        inc: this.inc.bind(this)
      }
    }
  }

  inc() {
    this.setState(({counter})=>({
      counter: {
        ...counter,
        loaded: false
      }
    }));

    setTimeout(() => {
      this.setState(({counter})=>({
        counter: {
          ...counter,
          loaded: true,
          count: counter.count+1
        }
      }));
    }, 3000);
  }

  render() {
    return (
      <Provider value={this.state.counter}>
        <CounterDisplay />
      </Provider>
    );
  }
}
