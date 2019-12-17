import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-bootstrap'
import Fragment from '../Fragment'
import classNames from 'classnames'

class Field extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired, // TODO custom element
    error: PropTypes.node,
    label: PropTypes.node,
    classNames: PropTypes.object
  }

  static defaultProps = {
    disabled: false,
    classNames: {}
  }

  modifyChildren (child) {
    const className = classNames({
      'is-invalid': this.props.error
    })

    const props = {
      className
    }

    return React.cloneElement(child, props)
  }

  render () {
    const { children, error, label, classNames } = this.props

    return (
      <Fragment>
        <Form.Group className={classNames}>
          <Form.Label>{label}</Form.Label>
          {React.Children.map(children, child => this.modifyChildren(child))}
          <Form.Control.Feedback type='invalid'>
            {error}
          </Form.Control.Feedback>
        </Form.Group>
      </Fragment>
    )
  }
}

export default Field
