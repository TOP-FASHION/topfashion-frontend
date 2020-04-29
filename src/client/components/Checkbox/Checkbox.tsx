import * as React from 'react';
import { Form } from 'react-bootstrap';

interface Props {
  label?: string;
  handleCheckboxChange?: Function;
}

function Checkbox({ label, handleCheckboxChange }: Props) {
  const [isChecked, setChecked] = React.useState(false);

  const toggleCheckboxChange = () => {
    setChecked(isChecked);
    handleCheckboxChange(label);
  };

  return (
    <Form.Check
      required
      name={label}
      label={label}
      onChange={() => toggleCheckboxChange}
      id="validationFormik0"
    />
  );
}

export default Checkbox;
