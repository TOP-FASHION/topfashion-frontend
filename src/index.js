import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'mobx-react';
import App from './decorators'
import { BrowserRouter, Route } from 'react-router-dom'
import stores from './store'
import './styles/main.scss';

const supportsHistory = 'pushState' in window.history

const render = App => ReactDom.hydrate(
  <Provider {...stores}>
    <BrowserRouter forceRefresh={!supportsHistory}>
      <Route component={App} />
    </BrowserRouter>
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
