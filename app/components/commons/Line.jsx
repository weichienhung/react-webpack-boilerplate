import React, { PropTypes } from 'react';

const styles = {
  line: {
    borderTop: 'solid 1px black',
    margin: '10px 0',
    width: '100%',
  }
};

const Line = (props) => {
  const customizedStyles = Object.assign({}, styles.line, props.styles);
  return <section style={customizedStyles} />;
};

Line.propTypes = {
  styles: PropTypes.shape({
    line: PropTypes.object
  })
};

export default Line;
