/* global history, location */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import Fragment from '../components/Fragment'

import sessionTabStorage from '../utils/sessionTabStorage'
import searchParse from '../utils/text/url/searchParse'

// decorators
import MainDecorator from './MainDecorator/index'
import ProductDecorator from './ProductDecorator'
import EmptyDecorator from './EmptyDecorator'

// modals
import Modals from '../modals'
// other
import Redirections from '../redirections'
import Notifications from '../notifications'

class Decorators extends Component {
  static propTypes = {
    intl: PropTypes.object
  }
  static childContextTypes = {
    url: PropTypes.shape({
      history: PropTypes.arrayOf(PropTypes.string),
      position: PropTypes.number,
      save: PropTypes.func
    })
  }
  url = JSON.parse(sessionTabStorage.get('url') || '{"history": [], "position": -1}')
  getChildContext () {
    return {
      url: {
        ...this.url,
        save: this.save
      }
    }
  }

  save = (state = this.url) => sessionTabStorage.set('url', JSON.stringify(state))

  componentDidMount () {
    const pushState = history.pushState.bind(history)
    if (!this.url.history.length) {
      this.url.history.push(location.pathname + location.search)
      this.url.position = 0
    }
    history.pushState = (...a) => {
      this.push(/^(https?:\/\/[^/]*)?(.*)/.exec(a[2])[2])
      return pushState(...a)
    }
    window.addEventListener('popstate', () => {
      const url = location.pathname + location.search
      const isBack = this.url.history[this.url.position - 1] === url
      const search = searchParse(location.search)
      if (isBack) {
        this.url.position--
      } else {
        this.url.position++
        this.url.history.length = this.url.position + 1
      }
      this.save()
      if (isBack && search.modal && this.url.history[this.url.position + 1] === url) {
        const closeButton = document.querySelector('.modal-buttonRoot')
        if (closeButton) {
          closeButton.click()
        }
      }
    })
    if (location.pathname + location.search !== this.url.history[this.url.position]) {
      this.push(location.pathname + location.search)
    }
  }

  push (url) {
    this.url.position++
    if (this.url.position === this.url.history.length) {
      this.url.history.push(url)
    } else if (this.url.position < this.url.history.length) {
      this.url.history.length = this.url.position
      this.url.history.push(url)
    } else {
      console.error('url position is not stable')
    }
    this.save()
  }


  render () {
    return (
      <Fragment>
        {/*<Notifications />*/}
        {/*<Redirections />*/}
        {/*<Modals />*/}

        <Route path='/blocked' component={EmptyDecorator} exact />
        <Route path={`/products/:category/:id`} component={ProductDecorator} exact />
        <Route component={MainDecorator} />
      </Fragment>
    )
  }
}

export default Decorators
