import './assets/public/css/bootstrap.min.css'
import './assets/public/css/slick.min.css'
import 'react-toastify/dist/ReactToastify.min.css'
import 'react-input-range/lib/css/index.css'
import './styles/main.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'mobx-react'
import App from './decorators'
import RootStore from './core/Store'
import Root from './root'

const render = () =>
  ReactDOM.hydrate(
    <AppContainer>
      <Provider {...RootStore}>
        <Root />
      </Provider>
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
