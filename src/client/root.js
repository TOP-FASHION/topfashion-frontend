import React, { Component } from 'react'
import { addLocaleData, IntlProvider } from 'react-intl'
import { BrowserRouter, Route } from 'react-router-dom'
import { observer } from 'mobx-react'
import App from './decorators'

const supportsHistory = 'pushState' in window.history
const messages = window.__data.messages
const locale = window.__data.locale || 'en'
addLocaleData(window.__data.localeData)

@observer
class Root extends Component {
  componentDidMount () {
    // preloader
    setTimeout(() => {
      window.addEventListener('login', (event) => {
        if (event.detail) {
          document.body.classList.remove('preloading')
        }
      })
    })
  }

  render () {
    return (
      <IntlProvider locale={locale} messages={messages}>
        <BrowserRouter forceRefresh={!supportsHistory}>
          <Route component={App} />
        </BrowserRouter>
      </IntlProvider>
    )
  }
}

export default Root
