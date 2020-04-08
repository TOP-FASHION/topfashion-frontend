import * as React from 'react'
import * as ReactBootstrap from 'react-bootstrap'
import classNames from 'classnames'

interface Props {
  children: React.ReactNode,
  error?: React.ReactNode,
  label?: React.ReactNode,
  className?: string,
}

function Field ({ children, error, label, className }: Props) {
  const modifyChildren = (child) => {
    const classes = classNames({
      'is-invalid': error
    })

    const props = {
      className: classes
    }

    return React.cloneElement(child, props)
  }

  return (
    <ReactBootstrap.Form.Group className={className}>
      <ReactBootstrap.Form.Label>{label}</ReactBootstrap.Form.Label>
      {React.Children.map(children, child => modifyChildren(child))}
      <ReactBootstrap.Form.Control.Feedback type='invalid'>
        {error}
      </ReactBootstrap.Form.Control.Feedback>
    </ReactBootstrap.Form.Group>
  )
}

export default Field
