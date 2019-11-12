import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { SwitchLang } from '../routing'
import Group from '../../components/Group'
import isShowModalAction from '../../utils/isShowModalAction'
import { observer, inject } from 'mobx-react'
import searchParse from '../../utils/text/url/searchParse'

// components
import Header from '../Header'
import Footer from '../Footer'
import RedirectToHome from '../../containers/RedirectToHome'

// pages
import Home from '../../pages/Home'
import About from '../../pages/About'
import NotFound from '../../pages/NotFound'
// import Login from '../../pages/Login'
import Logout from '../../pages/Logout'
import ProductPage from '../../pages/ProductPage'
import CartPage from '../../pages/CartPage'
//import WishlistPage from '../../pages/WishlistPage'
import ProductCategoryPage from '../../pages/ProductCategoryPage'

@inject('loginStore')
@observer
class MainDecorator extends Component {
  static isLoggedIn (loginStore, component, component2 = RedirectToHome) {
    return loginStore.loggedIn ? component : component2
  }

  static isLoggedOut (loginStore, component, component2 = RedirectToHome) {
    return loginStore.loggedIn ? component2 : component
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
              <Route path='/logout' component={MainDecorator.isLoggedIn(this.props.loginStore, Logout)} exact />
              <Route path='/category/product/:productId' component={ProductPage} exact />
              <Route path='/category' component={ProductCategoryPage} exact />
              <Route path='/category/:categoryId' component={ProductCategoryPage} exact />
              <Route path='/cart' component={MainDecorator.isLoggedIn(this.props.loginStore, CartPage)} exact />
              {/*<Route path='/wishlist' component={WishlistPage} exact />*/}
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
