// eslint-disable-next-line no-unused-vars
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
    if (props.hasOwnProperty('hidden')) {
      // eslint-disable-line no-prototype-builtins
      return !props.hidden;
    }
    if (props.hasOwnProperty('show')) {
      // eslint-disable-line no-prototype-builtins
      return props.show;
    }
    if (props.hasOwnProperty('hide')) {
      // eslint-disable-line no-prototype-builtins
      return !props.hide;
    }
    return true;
  };

  return isShown() && typeof children() !== 'undefined' ? children() : null;
}

export default Fragment;
