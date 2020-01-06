import './assets/public/css/bootstrap.min.css'
import './assets/public/css/slick.min.css'
import 'react-toastify/dist/ReactToastify.min.css'
import 'react-input-range/lib/css/index.css'
import './styles/main.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'mobx-react'
import runtime from 'serviceworker-webpack-plugin/lib/runtime'
import App from './decorators'
import RootStore from './core/Store'
import Root from './root'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-boost'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://localhost:8443/graphql' }),
  cache: new InMemoryCache()
})

const render = () =>
  ReactDOM.render( // TODO SSR
    <AppContainer>
      <ApolloProvider client={client}>
        <Provider {...RootStore}>
          <Root />
        </Provider>
      </ApolloProvider>
    </AppContainer>,
    document.getElementById('root')
  )

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./root', () => {
    const App = require('./root').default // eslint-ignore-line
    render(App)
  })
}

render(App)

if ('serviceWorker' in navigator) {
  runtime.register()
}
