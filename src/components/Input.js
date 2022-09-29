import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  render() {
    const { type, name, label, onChange, value, dataTest } = this.props;
    return (
      <label className="label" htmlFor={ name }>
        { label }
        <div className="control">
          <input
            className="input"
            type={ type }
            name={ name }
            value={ value }
            onChange={ onChange }
            id={ name }
            data-testid={ dataTest }
          />
        </div>
      </label>
    );
  }
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  dataTest: PropTypes.string,
};

Input.defaultProps = {
  label: '',
  value: '',
  name: '',
  dataTest: '',
  onChange: null,
};

export default Input;
