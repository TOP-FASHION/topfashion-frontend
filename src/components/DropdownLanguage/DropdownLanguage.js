import React from 'react';
import { FormattedMessage } from 'react-intl';
import Dropdown from '../Dropdown';

function DropdownLanguage(props) {
  const { locale} = props;

  const languages = [
    {
      title: 'English',
      locale: 'en',
      code: 'EN',
      icon: 'images/languages/language-1.png',
      icon_srcset: '../../static/img/languages/language-1.png 1x, images/languages/language-1@2x.png 2x',
    },
    {
      title: 'Russian',
      locale: 'ru',
      code: 'RU',
      icon: 'images/languages/language-2.png',
      icon_srcset: '../../static/img/languages/language-2.png 1x, images/languages/language-2@2x.png 2x',
    },
  ];

  const language = languages.find((x) => x.locale === locale);

  const title = (
    <React.Fragment>
      Language
      {': '}
      <span className="topbar__item-value">EN</span>
    </React.Fragment>
  );

  return (
    <Dropdown
      title={title}
      withIcons
      items={languages}
    />
  );
}

export default DropdownLanguage;
