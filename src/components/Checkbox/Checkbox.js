import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-bootstrap'

class Checkbox extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    handleCheckboxChange: PropTypes.func.isRequired
  }

  state = {
    isChecked: false
  }

  toggleCheckboxChange = () => {
    const { handleCheckboxChange, label } = this.props

    this.setState(({ isChecked }) => ({
      isChecked: !isChecked
    }))

    handleCheckboxChange(label)
  }

  render () {
    const { label, classes } = this.props
    const { isChecked } = this.state

    return (
      <Form.Check
        required
        name='terms'
        label='Agree to terms and conditions'
        onChange={this.toggleCheckboxChange}
        id='validationFormik0'
      />
    )
  }
}

export default Checkbox
