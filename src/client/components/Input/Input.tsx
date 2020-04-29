import * as React from 'react';
import { Form } from 'react-bootstrap';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  name?: string;
  placeholder?: string;
  type?: 'text' | 'number' | 'password';
  value?: string;
  onChange?: () => void | Function;
  className?: string;
}

function Input({
  name,
  placeholder,
  type,
  value,
  onChange,
  className,
  disabled,
  ...otherProps
}: Props) {
  return (
    <Form.Control
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      className={className}
      disabled={disabled}
      {...otherProps}
    />
  );
}

export default Input;
