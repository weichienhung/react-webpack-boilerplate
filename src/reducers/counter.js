const initial = {
  count: 0,
  loaded: true
};

const counter = (state = initial, action) => {
  switch (action.type) {
    case 'PREPARE_INCREMENT':
      return {
        ...state,
        loaded: false
      };
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1,
        loaded: true
      };
    default:
      return state;
  }
};

export default counter;
