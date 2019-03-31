import React from 'react'
import ReactDom from 'react-dom'
import App from './decorators'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'

import createReduxStore from './services/store'
import './styles/main.scss';

const store = createReduxStore(window.__INITIAL_STATE__)
const supportsHistory = 'pushState' in window.history

const render = App => ReactDom.hydrate(
  <Provider store={store}>
    <AppContainer>
      <BrowserRouter forceRefresh={!supportsHistory}>
        <Route component={App} />
      </BrowserRouter>
    </AppContainer>
  </Provider>
  ,
  document.getElementById('root')
)

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./decorators', () => {
    const App = require('./decorators').default
    render(App)
  })
}

render(App)
