import * as React from 'react';
import classNames from 'classnames';
import './InputNumber.scss';

interface Props {
  onChange?: ({}) => void | Function;
  size?: 'sm' | 'lg';
  step?: number;
  min?: number;
  max?: number;
  value?: string | number;
  disabled?: boolean;
  readonly?: boolean;
  className?: string;
}

InputNumber.defaultProps = {
  value: '',
  step: 1,
  max: null,
  min: null,
};

function InputNumber(props: Props) {
  const handleChange = (event: any) => {
    const { min, onChange } = props;
    if (onChange) {
      const value = parseFloat(event.target.value);

      onChange(Number.isNaN(value) ? min || 0 : value);
    }
  };

  const handleAddMouseDown = () => {
    change(1);
    changeByTimer(1);
  };

  const handleSubMouseDown = () => {
    change(-1);
    changeByTimer(-1);
  };

  /**
   * @param direction - one of [-1, 1]
   */
  const change = (direction: any) => {
    const { value, step, max, min, onChange } = props;
    let newValue =
      (typeof value === 'string' || Number.isNaN(value) ? 0 : value) +
      step * direction;

    if (max !== null) {
      newValue = Math.min(max, newValue);
    }
    if (min !== null) {
      newValue = Math.max(min, newValue);
    }

    if (newValue !== value) {
      if (onChange) {
        onChange(newValue);
      }
    }
  };

  /**
   * @param direction - one of [-1, 1]
   */
  const changeByTimer = (direction: any) => {
    let interval: any;
    const timer = setTimeout(() => {
      interval = setInterval(() => this.change(direction), 50);
    }, 300);

    const documentMouseUp = () => {
      clearTimeout(timer);
      clearInterval(interval);

      document.removeEventListener('mouseup', documentMouseUp, false);
    };

    document.addEventListener('mouseup', documentMouseUp, false);
  };

  const { size, className, ...otherProps } = props;
  const classes = classNames('input-number', className);
  const formControlClasses = classNames('form-control input-number__input', {
    'form-control-sm': size === 'sm',
    'form-control-lg': size === 'lg',
  });

  return (
    <div className={classes}>
      <input
        className={formControlClasses}
        type="number"
        onChange={handleChange}
        {...otherProps}
      />
      <div className="input-number__add" onMouseDown={handleAddMouseDown} />
      <div className="input-number__sub" onMouseDown={handleSubMouseDown} />
    </div>
  );
}

export default InputNumber;
