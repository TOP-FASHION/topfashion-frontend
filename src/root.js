import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
  componentDidMount() {
    // preloader
    setTimeout(() => {
      const preloader = document.querySelector('.site-preloader');
      window.addEventListener('login', (event) => {
        if (event.detail) {
          preloader.parentNode.removeChild(preloader);
        }
      });
    });
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

Root.propTypes = {
  /** current locale */
  locale: PropTypes.string
}

export default Root
