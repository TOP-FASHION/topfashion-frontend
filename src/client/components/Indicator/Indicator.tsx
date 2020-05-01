import * as React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import './Indicator.scss';

interface Props {
  /** indicator value */
  value?: number | React.ReactNode;
  /** the component that will be shown in the dropdown */
  dropdown?: React.ReactElement;
  /** indicator icon */
  icon?: React.ReactNode;
  /** indicator url */
  url?: string;
  /** callback function that is called when the dropdown is opened */
  onOpen?: Function;
  /** callback function that is called when the dropdown is closed */
  onClose?: Function;
  onClick?: Function;
  className?: string;
}

function Indicator({
  value,
  dropdown,
  icon,
  url,
  onOpen,
  onClose,
  onClick,
  className,
}: Props) {
  const [isOpen, setOpen] = React.useState(false);
  let wrapperRef: any;

  React.useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);

    return function cleanup() {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  });

  React.useEffect(() => {
    if (isOpen && onOpen) {
      onOpen();
    }
    if (!isOpen && onClose) {
      onClose();
    }
  }, [isOpen]);

  const setWrapperRef = (node: HTMLElement) => {
    wrapperRef = node;
  };

  const handleOutsideClick = (event: any) => {
    if (wrapperRef && !wrapperRef.contains(event.target) && isOpen) {
      close();
    }
  };

  const handleButtonClick = (event: any) => {
    if (dropdown) {
      event.preventDefault();
    }

    toggle();

    if (onClick) {
      onClick(event);
    }
  };

  const toggle = () => {
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
  };

  let button;

  if (value !== undefined) {
    value = <span className="indicator__value" data-count={value} />;
  }

  const title = (
    <span className="indicator__area">
      {icon}
      {value}
    </span>
  );

  if (url) {
    button = (
      <Link to={url} className="indicator__button" onClick={handleButtonClick}>
        {title}
      </Link>
    );
  } else {
    button = (
      <button
        type="button"
        className="indicator__button"
        onClick={handleButtonClick}
      >
        {title}
      </button>
    );
  }

  if (dropdown) {
    dropdown = <div className="indicator__dropdown">{dropdown}</div>;
  }

  const classes = classNames(
    `indicator indicator--trigger--click ${className}`,
    {
      'indicator--opened': isOpen,
    }
  );

  return (
    <div className={classes} ref={setWrapperRef}>
      {button}
      {dropdown}
    </div>
  );
}

export default Indicator;
