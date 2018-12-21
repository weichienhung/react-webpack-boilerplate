
const prepare = () => { // eslint-disable-line
  return {
    type: 'PREPARE_INCREMENT',
  };
};

export const increment = ({}) => dispatch => {
  dispatch(prepare());
  return setTimeout(() => {
    dispatch({
      type: 'INCREMENT'
    });
  }, 3000);
};
