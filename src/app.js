import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'mobx-react'
import App from './decorators'
import AppContainer from 'react-hot-loader'
import { BrowserRouter, Route } from 'react-router-dom'
import stores from './core/store'
import './styles/main.scss'

const supportsHistory = 'pushState' in window.history
console.log('+')
const renderMain = App => ReactDom.hydrate(
  <AppContainer>
    <Provider {...stores}>
      <BrowserRouter forceRefresh={!supportsHistory}>
        <Route component={App} />
      </BrowserRouter>
    </Provider>
  </AppContainer>,
  document.getElementById('root')
)

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./decorators', () => {
    const App = require('./decorators').default
    renderMain(App)
  })
}

renderMain(App)
