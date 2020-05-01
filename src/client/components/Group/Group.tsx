import * as React from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

function Group({ children, ...otherProps }: Props) {
  return <div {...otherProps}>{children}</div>;
}

export default Group;
