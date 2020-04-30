import * as React from 'react';
import { addLocaleData, IntlProvider } from 'react-intl';
import { BrowserRouter, Route } from 'react-router-dom';
import { observer } from 'mobx-react';
import App from './decorators';

const supportsHistory = 'pushState' in window.history;
const messages = window.__INITIAL_STATE__.messages || {};
const locale = window.__INITIAL_STATE__.locale || 'en';
addLocaleData(window.__INITIAL_STATE__.localeData);

const Root = observer(() => {
  React.useEffect(() => {
    setTimeout(() => {
      window.addEventListener('login', (event: any) => {
        if (event.detail) {
          document.body.classList.remove('preloading');
        }
      });
    });
  }, []);

  return (
    <IntlProvider locale={locale} messages={messages}>
      <BrowserRouter forceRefresh={!supportsHistory}>
        <Route component={App} />
      </BrowserRouter>
    </IntlProvider>
  );
});

export default Root;