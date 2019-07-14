import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import createHistory from 'history/createBrowserHistory'
import { Provider } from 'mobx-react'
import App from './decorators'
import allStore from './core/Store'

const history = createHistory()

const render = App => ReactDOM.hydrate(
  <AppContainer>
    <Provider {...allStore}>
      <App history={history} />
    </Provider>
  </AppContainer>,
  document.getElementById('root')
)

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./decorators', () => {
    const App = require('./decorators').default // eslint-ignore-line
    render(App)
  })
}

render(App)
