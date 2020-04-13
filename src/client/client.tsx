import './assets/css/bootstrap.min.css'
import './assets/css/slick.min.css'
import 'react-toastify/dist/ReactToastify.min.css'
import 'react-input-range/lib/css/index.css'
import './styles/main.scss'

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
// import runtime from 'serviceworker-webpack-plugin/lib/runtime'
import App from './decorators'
import Root from './root'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-boost'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { AppContext, stores } from './core/Store/context'

const client = new ApolloClient({
  link: new HttpLink({ uri: '/graphql' }),
  cache: new InMemoryCache()
})

// eslint-disable-next-line no-empty-pattern
const render = (App: (() => any) | any) =>
  ReactDOM.render( // TODO SSR
    <AppContainer>
      <ApolloProvider client={client}>
        <AppContext.Provider value={stores}>
          <Root />
        </AppContext.Provider>,
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

// if ('serviceWorker' in navigator) {
//   runtime.register()
// }
