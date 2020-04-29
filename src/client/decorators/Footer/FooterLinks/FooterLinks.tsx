import React from 'react';
import { injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import './FooterLinks.scss';

interface Props {
  title?: any;
  items?: Array<any>;
}

function FooterLinks({ title, items = [] }: Props) {
  const linksList = items.map((item: any, index: any) => (
    <li key={index} className="footer-links__item">
      <Link to={item.url} className="footer-links__link">
        {item.title}
      </Link>
    </li>
  ));

  return (
    <div className="site-footer__widget footer-links">
      <h5 className="footer-links__title">{title}</h5>
      <ul className="footer-links__list">{linksList}</ul>
    </div>
  );
}

export default injectIntl(FooterLinks);
