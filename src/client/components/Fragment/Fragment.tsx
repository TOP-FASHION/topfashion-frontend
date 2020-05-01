import * as React from 'react';

interface Props {
  hidden?: boolean;
  show?: boolean;
  hide?: boolean;
  children?: any;
}

function Fragment(props: Props) {
  const children = () => {
    return typeof props.children === 'function'
      ? props.children()
      : props.children;
  };

  const isShown = () => {
    if (Object.prototype.hasOwnProperty.call(props, 'hidden')) {
      return !props.hidden;
    }
    if (Object.prototype.hasOwnProperty.call(props, 'show')) {
      return props.show;
    }
    if (Object.prototype.hasOwnProperty.call(props, 'hide')) {
      return !props.hide;
    }
    return true;
  };

  return isShown() && typeof children() !== 'undefined' ? children() : null;
}

export default Fragment;
