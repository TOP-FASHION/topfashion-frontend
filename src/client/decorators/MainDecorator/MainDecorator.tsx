import * as React from 'react'
import { Route } from 'react-router-dom'
import { observer } from 'mobx-react'
import { SwitchLang } from '../routing'
import { AppContext } from '../../core/Store/context'

// components
import Group from '../../components/Group'
import MobileMenu from '../../containers/header/MobileMenu'
import Header from '../Header'
import Footer from '../Footer'
import RedirectToHome from '../../containers/shared/RedirectToHome'

// pages
import HomePage from '../../pages/HomePage'
import NotFound from '../../pages/NotFound'
/*
import ProductPage from '../../pages/ProductPage'
import CartPage from '../../pages/CartPage'
import WishlistPage from '../../pages/WishlistPage'
import ProductCategoryPage from '../../pages/ProductCategoryPage'
import SearchPage from '../../pages/SearchPage'
*/
import BlogCategoryPage from '../../pages/BlogCategoryPage'
import BlogPostPage from '../../pages/BlogPostPage'
// import StaticPage from '../../pages/StaticPage'
import AccountPage from '../../pages/AccountPage'
import ContactUsPage from '../../pages/ContactUsPage'

type IPanel<P> = React.FunctionComponent<P> & {
  isLoggedIn?: any,
  isLoggedOut?: any
}

const MainDecorator: IPanel<any> = observer((props: any) => {
  const { loginStore } = React.useContext(AppContext)

  MainDecorator.isLoggedIn = (loginStore: any, component: any, component2 = RedirectToHome) => {
    return loginStore.loggedIn ? component : component2
  }

  MainDecorator.isLoggedOut = (loginStore: any, component: any, component2 = RedirectToHome) => {
    return loginStore.loggedIn ? component2 : component
  }

  return (
    <Group id='main'>
      <Group className='main-decorator__wrapper'>
        <header className='site__header'>
          <Header />
        </header>
        <MobileMenu />
        <Group className='main-decorator__content'>
          <SwitchLang>
            <Route path='/' component={HomePage} exact />
            {/*
            <Route path='/category/product/:productId' component={ProductPage} exact />
            <Route path='/category' render={(props) => (<ProductCategoryPage {...props} columns={4} viewMode='grid' sidebarPosition='start' />)} exact />
            <Route path='/category/:categoryId' render={(props) => (<ProductCategoryPage {...props} columns={4} viewMode='grid' sidebarPosition='start' />)} exact />
            <Route path='/cart' component={CartPage} exact />
            <Route path='/wishlist' component={WishlistPage} exact />
            <Route path='/search' component={SearchPage} exact />
            */}
            <Route path='/promotions-news' render={() => (<BlogCategoryPage {...props} layout='grid' />)} exact />
            <Route path='/promotions-news/:postId' render={() => (<BlogPostPage {...props} layout='full' />)} exact />
            <Route path='/account' component={MainDecorator.isLoggedIn(loginStore, AccountPage)} />
            <Route path='/contact-us' component={ContactUsPage} exact />
            {/*
            {['about-us', 'policy'].map(page => <Route key={page} path={'/' + page} component={() => <StaticPage page={page} />} exact />)}
            */}
            <Route component={NotFound} />
          </SwitchLang>
        </Group>
      </Group>
      <footer className='main-decorator__footer'>
        <Footer />
      </footer>
    </Group>
  )
})

export default MainDecorator
