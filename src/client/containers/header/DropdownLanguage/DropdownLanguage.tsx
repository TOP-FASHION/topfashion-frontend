import * as React from 'react';
import { observer } from 'mobx-react';
// @ts-ignore
import { injectIntl } from 'react-intl';
import setMessages from '../../../utils/setMessages';
import messages from './DropdownLanguage.messages';
import Dropdown from '../../shared/Dropdown';

const DropdownLanguage = observer((props: any) => {
  const message = setMessages(props, messages, 'app.languages.');

  const languages = [
    {
      label: message('en'),
      locale: 'en',
      icon: '/assets/img/languages//language-1.png',
      icon_srcset:
        '/assets/img/languages/language-1.png 1x, images/languages/language-1@2x.png 2x',
    },
    {
      label: message('ru'),
      locale: 'ru',
      icon: '/assets/img/languages//language-2.png',
      icon_srcset:
        '/assets/img/languages/language-2.png 1x, images/languages/language-2@2x.png 2x',
    },
  ];

  const onChange = (value: any) => {
    const urlParts = window.location.href.split(/(\/|\?)/);
    if (urlParts && urlParts[6] === props.intl.locale) {
      urlParts[6] = value;
    } else {
      urlParts[6] = urlParts[6] ? `${value}/${urlParts[6]}` : value;
    }

    const url = urlParts.join('');
    window.location.href = url.endsWith('/') ? url.slice(0, -1) : url;
  };

  const language = languages.find((x) => x.locale === props.intl.locale);

  const title = (
    <>
      <span className="topbar__item-value">
        <img src={language.icon} width="33px" />
      </span>
    </>
  );

  return (
    <Dropdown
      title={title}
      withIcons
      items={languages}
      onClick={(item: any) => onChange(item.locale)}
    />
  );
});

export default injectIntl(DropdownLanguage);
