import * as React from 'react';
import { Link } from 'react-router-dom';
// @ts-ignore
import { injectIntl } from 'react-intl';
import setMessages from '../../../utils/setMessages';
import messages from './Topbar.messages';
import DropdownLanguage from '../DropdownLanguage';
import './Topbar.scss';

const Topbar = (props: any) => {
  const message = setMessages(props, messages, 'app.topbar.');

  const links = [
    { title: message('promotions'), url: '/promotions-news' },
    { title: message('contacts'), url: '/contact-us' },
  ];

  const linksList = links.map((item, index) => (
    <div key={index} className="topbar__item topbar__item--link">
      <Link className="link" to={item.url}>
        {item.title}
      </Link>
    </div>
  ));

  return (
    <div className="site-header__topbar topbar d-md-block d-lg-block d-xl-block d-none">
      <div className="topbar__container container-fluid">
        <div className="topbar__row">
          {linksList}
          <div className="topbar__spring" />
          <div className="topbar__item">
            Звонок бесплатный{' '}
            <a href="tel: 88002500557" className="topbar__call-phone">
              8 800 250 05 57
            </a>
          </div>
          <div className="topbar__item">
            <DropdownLanguage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default injectIntl(Topbar);
