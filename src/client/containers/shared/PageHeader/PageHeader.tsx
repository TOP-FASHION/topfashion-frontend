import React from 'react';
import { Link } from 'react-router-dom';
import './PageHeader.scss';

interface Props {
  header?: any;
  breadcrumb?: any;
}

const PageHeader = ({ breadcrumb = [], header }: Props) => {
  if (header) {
    header = (
      <div className="page-header__title">
        <h1>{header}</h1>
      </div>
    );
  }

  if (breadcrumb.length > 0) {
    const lastIndex = breadcrumb.length - 1;

    breadcrumb = breadcrumb.map((item: any, index: any) => {
      let link;

      if (lastIndex === index) {
        link = (
          <li
            key={index}
            className="breadcrumb-item active"
            aria-current="page"
          >
            {item.title}
          </li>
        );
      } else if (item.url !== undefined) {
        link = (
          <li key={index} className="breadcrumb-item">
            <Link to={item.url}>{item.title}</Link>
            <i className="fas fa-angle-right breadcrumb-arrow" />
          </li>
        );
      }

      return link;
    });

    breadcrumb = (
      <div className="page-header__breadcrumb">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">{breadcrumb}</ol>
        </nav>
      </div>
    );
  }

  return (
    <div className="page-header">
      <div className="page-header__container container-fluid">
        {breadcrumb}
        {header}
      </div>
    </div>
  );
};

export default PageHeader;
