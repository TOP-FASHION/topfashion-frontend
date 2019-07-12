import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Fragment from '../../components/Fragment'
import Group from '../../components/Group'
import isShowModalAction from '../../utils/isShowModalAction'

// components
import Header from '../Header'
import Footer from '../Footer'

// pages
import Home from '../../pages/Home'
import NotFound from '../../pages/NotFound'

class MainDecorator extends Component {
  shouldComponentUpdate (nextProps, nextState) {
    return !isShowModalAction(nextProps, nextState)
  }

  render () {
    return (
      <Fragment>
        <Group id='main'>
          <div className='main-decorator__wrapper'>
            <Group className='main-decorator__content'>
              <Route path='/' component={Home} exact />
              <Route component={NotFound} />
            </Group>
          </div>
          <footer className='main-decorator__footer'>
            <Footer />
          </footer>
        </Group>
      </Fragment>
    )
  }
}

export default MainDecorator
