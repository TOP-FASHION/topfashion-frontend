import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Form} from 'react-bootstrap'

class Input extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    className: PropTypes.string,
  }

  static defaultProps = {
    classNames: ''
  }

  render () {
    const { name, placeholder, type, value, onChange, className} = this.props

    return (
      <Form.Control
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className={className}
      />
    )
  }
}

export default Input
