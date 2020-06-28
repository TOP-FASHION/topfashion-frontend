import React from 'react';
import classNames from 'classnames';
import { injectIntl } from 'react-intl';
import Fragment from '../../../components/Fragment';

interface Props {
  content?: any;
  className?: any;
}

const StaticContent = ({ content, className }: Props) => {
  const rootClassName = classNames('static-content', className);

  const contentStatic = (text: any) => {
    return <div className={rootClassName}>{text}</div>;
  };

  return (
    <Fragment>{contentStatic(placeholder(content, 'placeholders'))}</Fragment>
  );
};

export default injectIntl(StaticContent);

function placeholder(text: any, data: any = {}) {
  return text.replace(
    /{([a-zA-Z0-9]+)}/g,
    (placeholder: any, placeholderId: any) =>
      Object.prototype.hasOwnProperty.call(data, placeholderId)
        ? data[placeholderId]
        : placeholder
  ); // eslint-disable-line no-prototype-builtins
}
