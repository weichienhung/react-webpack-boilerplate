import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { increment } from '../actions/counter';
import App from '../components/App';

const AppContainer = connect(
  state => ({
    counter: state.counter
  }),
  dispatch => bindActionCreators({
    counterAdd: increment
  }, dispatch)
)(App);

export default AppContainer;
