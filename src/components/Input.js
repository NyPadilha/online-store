import React from 'react';
import PropTypes from 'prop-types';

export default class Input extends React.Component {
  render() {
    const { type, dataTestid, name, value, onInputChange, placeHolder } = this.props;
    return (
      <input
        type={ type }
        data-testid={ dataTestid }
        name={ name }
        value={ value }
        onChange={ onInputChange }
        placeholder={ placeHolder }
      />
    );
  }
}

Input.defaultProps = {
  type: 'text',
  placeHolder: '',
  dataTestid: '',
};

Input.propTypes = {
  type: PropTypes.string,
  dataTestid: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  placeHolder: PropTypes.string,
};
