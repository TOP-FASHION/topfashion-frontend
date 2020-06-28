import React from 'react';

interface Props {
  hidden?: boolean;
  children?: any;
}

const Fragment = ({ hidden, children }: Props) => {
  const isShown = !hidden;

  const getChildren = () => {
    if (typeof children === 'undefined') {
      return null;
    }
    if (typeof children === 'function') {
      return children();
    }
    return children;
  };

  return isShown ? getChildren() : null;
};

export default Fragment;
