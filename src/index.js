import React from 'react'
import ReactDOM from 'react-dom'
import { addLocaleData, IntlProvider } from 'react-intl'
import acceptLanguage from 'accept-language'
import en from 'react-intl/locale-data/en'
import fr from 'react-intl/locale-data/fr'
import { AppContainer } from 'react-hot-loader'
import createHistory from 'history/createBrowserHistory'
import { Provider } from 'mobx-react'
import i18n, { locale } from './locales'
import App from './decorators'
import allStore from './core/Store'

const history = createHistory()
acceptLanguage.languages(['en', 'ru'])
addLocaleData([...en, ...fr])

const render = App =>
  ReactDOM.hydrate(
    <AppContainer>
      <Provider {...allStore}>
        <IntlProvider locale={locale} messages={i18n[locale]}>
          <App history={history} />
        </IntlProvider>
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
