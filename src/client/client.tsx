import './assets/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-input-range/lib/css/index.css';
import './assets/css/slick.min.css';
import './styles/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { loadableReady } from '@loadable/component';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-boost';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { AppContext, stores } from './core/Store/context';
import Root from './root';
import App from './decorators';

const client = new ApolloClient({
  link: new HttpLink({ uri: '/graphql' }),
  cache: new InMemoryCache(),
});

const render = (Routes: Array<object>) => {
  const renderMethod = (module as any).hot ? ReactDOM.render : ReactDOM.hydrate;

  renderMethod(
    <AppContainer>
      <ApolloProvider client={client}>
        <AppContext.Provider value={stores}>
          <Root />
        </AppContext.Provider>
      </ApolloProvider>
    </AppContainer>,
    document.getElementById('react-view')
  );
};

// loadable-component setup
loadableReady(() => {
  // @ts-ignore
  render(App);
});

if ((module as any).hot) {
  // Enable webpack hot module replacement for routes
  (module as any).hot.accept('./root', () => {
    try {
      const nextRoutes = require('./root').default;

      render(nextRoutes);
    } catch (error) {
      console.error(`==> 😭  Routes hot reloading error ${error}`);
    }
  });
}
