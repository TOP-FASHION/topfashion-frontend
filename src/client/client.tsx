import './assets/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-input-range/lib/css/index.css';
import './assets/css/slick.min.css';
import './styles/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { addLocaleData, IntlProvider } from 'react-intl';
import { BrowserRouter, Route } from 'react-router-dom';
import { loadableReady } from '@loadable/component';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-boost';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { AppContext, stores } from './store/context';
import App from './decorators';

const client = new ApolloClient({
  link: new HttpLink({ uri: '/graphql' }),
  cache: new InMemoryCache(),
});

const supportsHistory = 'pushState' in window.history;
const messages = window.__INITIAL_STATE__.messages || {};
const locale = window.__INITIAL_STATE__.locale || 'en';
addLocaleData(window.__INITIAL_STATE__.localeData);

const render = (MainComponent) => {
  const renderMethod = (module as any).hot ? ReactDOM.render : ReactDOM.hydrate;

  renderMethod(
    <AppContainer>
      <ApolloProvider client={client}>
        <AppContext.Provider value={stores}>
          <IntlProvider locale={locale} messages={messages}>
            <BrowserRouter forceRefresh={!supportsHistory}>
              <Route component={MainComponent} />
            </BrowserRouter>
          </IntlProvider>
        </AppContext.Provider>
      </ApolloProvider>
    </AppContainer>,
    document.getElementById('react-view')
  );
};

// loadable-component setup
loadableReady(() => {
  render(App);
});

if ((module as any).hot) {
  // Enable webpack hot module replacement for routes
  (module as any).hot.accept('./decorators', () => {
    try {
      const nextRoutes = require('./decorators').default;

      render(nextRoutes);
    } catch (error) {
      console.error(`==> 😭  Routes hot reloading error ${error}`);
    }
  });
}
