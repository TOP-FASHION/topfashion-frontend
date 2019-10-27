import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { SwitchLang } from '../routing'
import Group from '../../components/Group'
import isShowModalAction from '../../utils/isShowModalAction'

// components
import Header from '../Header'
import Footer from '../Footer'

// pages
import Home from '../../pages/Home'
import About from '../../pages/About'
import NotFound from '../../pages/NotFound'
import searchParse from '../../utils/text/url/searchParse'
import { observer } from 'mobx-react/index'
// import Login from '../../pages/Login'
import ProductPage from '../../pages/ProductPage'
import CartPage from '../../pages/CartPage'
import ProductCategoryPage from '../../pages/ProductCategoryPage'

@observer
class MainDecorator extends Component {
  static isLoggedIn (core, component, component2 = RedirectToHome) {
    return core.item('loggedIn') ? component : component2
  }

  static isLoggedOut (core, component, component2 = RedirectToHome) {
    return core.item('loggedIn') ? component2 : component
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !isShowModalAction(nextProps, nextState)
  }

  render () {
    return (
      <Group id='main'>
        <Group className='main-decorator__wrapper'>
          <Header />
          <Group className='main-decorator__content'>
            <SwitchLang>
              <Route path='/' component={Home} exact />
              <Route path='/category/product/:productId' component={ProductPage} exact />
              <Route path='/category' component={ProductCategoryPage} exact />
              <Route path='/category/:categoryId' component={ProductCategoryPage} exact />
              <Route path='/cart' component={CartPage} exact />
              <Route path='/about' component={About} exact />
              <Route component={NotFound} />
            </SwitchLang>
          </Group>
        </Group>
        <footer className='main-decorator__footer'>
          <Footer />
        </footer>
      </Group>
    )
  }
}

export default MainDecorator
