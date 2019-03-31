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
import Catalog from '../../pages/Catalog'
import About from '../../pages/About'
import ContactUs from '../../pages/ContactUs'
import NotFound from '../../pages/NotFound'

class MainDecorator extends Component {
  shouldComponentUpdate (nextProps, nextState) {
    return !isShowModalAction(nextProps, nextState)
  }

  render () {
    return (
      <Group id='main'>
        <div className='main-decorator__wrapper'>
          <Header />
          <Group className='main-decorator__content'>
            <Route path='/' component={Home} exact />
            <Route path='/catalog' component={Catalog} />
            <Route path='/about' component={About} />
            <Route path='/contact-us' component={ContactUs} />
            <Route component={NotFound} />
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
