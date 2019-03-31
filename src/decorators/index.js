/* global history, location */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import Fragment from '../components/Fragment'

import sessionTabStorage from '../utils/sessionTabStorage'

// decorators
import MainDecorator from './MainDecorator/index'

// modals
import Modals from '../modals'
// other
import Redirections from '../redirections'
import Notifications from '../notifications'

class Decorators extends Component {
  static propTypes = {
    intl: PropTypes.object
  }
  childContextTypes = {
    url: PropTypes.shape({
      history: PropTypes.arrayOf(PropTypes.string),
      position: PropTypes.number,
      save: PropTypes.func
    })
  }


  render () {
    return (
      <Fragment>
        {/*<Notifications />*/}
        {/*<Redirections />*/}
        {/*<Modals />*/}
        <Route component={MainDecorator} />
      </Fragment>
    )
  }
}

export default Decorators
