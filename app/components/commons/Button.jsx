import React, { PropTypes } from 'react';

const styles = {
  button: {
    fontSize: 20,
    color: 'white',
    backgroundColor: '#4A90E2',
    cursor: 'pointer',
    outline: 'none',
    border: '#4A90E2 1px solid'
  },
  buttonHover:{
    backgroundColor: '#4A90FF'
  }
};


class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
  }

  toggleHover() {
    this.setState({ hover: !this.state.hover })
  }

  render() {
    let buttonStyle = Object.assign({}, styles.button, this.props.styles.button);; 

    if (this.state.hover) {
      buttonStyle = Object.assign({}, buttonStyle, styles.buttonHover, this.props.styles.buttonHover);
    }

    return (<input style={buttonStyle} 
      type="button" value={this.props.value}
      onClick={this.props.onClick}
      onMouseEnter={this.toggleHover.bind(this)} 
      onMouseLeave={this.toggleHover.bind(this)}
    ></input>);
  }
}

Button.propTypes = {
  styles: PropTypes.shape({
    button: PropTypes.object,
    buttonHover: PropTypes.object
  })
};

export default Button;
