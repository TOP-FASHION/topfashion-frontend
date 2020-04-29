import * as React from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  classNames?: any;
  children?: React.ReactNode;
}

function Group({ classNames = {}, children, ...otherProps }: Props) {
  return (
    <div className={classNames} {...otherProps}>
      {children}
    </div>
  );
}

export default Group;
