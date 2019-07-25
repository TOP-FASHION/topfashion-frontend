import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Group from '../../components/Group'
import isShowModalAction from '../../utils/isShowModalAction'

// components
import Header from '../Header'
import Footer from '../Footer'

// pages
import Home from '../../pages/Home'
import About from '../../pages/About'
import NotFound from '../../pages/NotFound'

import '../../styles/global.scss'

class MainDecorator extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !isShowModalAction(nextProps, nextState)
  }

  render() {
    return (
      <Group id='main'>
        <div className='main-decorator__wrapper'>
          <Header />
          <Group className='main-decorator__content'>
            <Switch>
              <Route path='/' component={Home} exact />
              <Route path='/about' component={About} exact />
              <Route component={NotFound} />
            </Switch>
          </Group>
        </div>
        <footer className='main-decorator__footer'>
          <Footer />
        </footer>
      </Group>
    )
  }
}

export default MainDecorator
