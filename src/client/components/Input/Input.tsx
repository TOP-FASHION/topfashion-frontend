import * as React from 'react'
import { Form } from 'react-bootstrap'

interface Props {
  disabled?: boolean,
  name?: string,
  placeholder?: string,
  type?: 'text' | 'number',
  value?: string,
  onChange?: () => void | Function,
  className?: string
}

function Input ({ name, placeholder, type, value, onChange, className, disabled }: Props) {
  return (
    <Form.Control
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      className={className}
      disabled={disabled}
    />
  )
}

export default Input
