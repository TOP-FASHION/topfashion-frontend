import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { SwitchLang } from '../routing'

// components
import Group from '../../components/Group'
import MobileMenu from '../../containers/shared/MobileMenu'
import MobileHeader from '../MobileHeader'
import Header from '../Header'
import Footer from '../Footer'
import RedirectToHome from '../../containers/shared/RedirectToHome'

// pages
import Home from '../../pages/Home'
import NotFound from '../../pages/NotFound'
import Logout from '../../pages/Logout'
import ProductPage from '../../pages/ProductPage'
import CartPage from '../../pages/CartPage'
import WishlistPage from '../../pages/WishlistPage'
import ProductCategoryPage from '../../pages/ProductCategoryPage'
import BlogCategoryPage from '../../pages/BlogCategoryPage'
import BlogPostPage from '../../pages/BlogPostPage'
import StaticPage from '../../pages/StaticPage'
import SearchPage from '../../pages/SearchPage'

@inject('loginStore')
@observer
class MainDecorator extends Component {
  static propTypes = {
    loginStore: PropTypes.object
  }

  static isLoggedIn (loginStore, component, component2 = RedirectToHome) {
    return loginStore.loggedIn ? component : component2
  }

  static isLoggedOut (loginStore, component, component2 = RedirectToHome) {
    return loginStore.loggedIn ? component2 : component
  }

  render () {
    return (
      <Group id='main'>
        <Group className='main-decorator__wrapper'>
          <header className='site__header d-lg-none'>
            <MobileHeader />
          </header>
          <header className='site__header d-lg-block d-none'>
            <Header />
          </header>
          <MobileMenu />
          <Group className='main-decorator__content'>
            <SwitchLang>
              <Route path='/' component={Home} exact />
              <Route path='/logout' component={MainDecorator.isLoggedIn(this.props.loginStore, Logout)} exact />
              <Route path='/category/product/:productId' component={ProductPage} exact />
              <Route path='/category' render={(props) => (<ProductCategoryPage {...props} columns={4} viewMode='grid' sidebarPosition='start' />)} exact />
              <Route path='/category/:categoryId' render={(props) => (<ProductCategoryPage {...props} columns={4} viewMode='grid' sidebarPosition='start' />)} exact />
              <Route path='/cart' component={CartPage} exact />
              <Route path='/wishlist' component={WishlistPage} exact />
              <Route path='/search' component={SearchPage} exact />
              <Route path='/promotions-news' render={(props) => (<BlogCategoryPage {...props} layout='grid' />)} exact />
              <Route path='/promotions-news/post' render={(props) => (<BlogPostPage {...props} layout='full' />)} exact />
              {['about-us', 'contact-us'].map(page => <Route key={page} path={'/' + page} component={() => <StaticPage page={page} />} exact />)}
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
