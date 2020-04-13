import * as React from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'
import { injectIntl } from 'react-intl'
import classNames from 'classnames'
import { AppContext } from '../../core/Store/context'
import NavPanel from '../../containers/header/NavPanel'
import Search from '../../containers/header/Search'
import Topbar from '../../containers/header/Topbar'
import Indicator from '../../components/Indicator'
import IndicatorCart from '../../containers/header/IndicatorCart'
import LoginForm from '../../containers/forms/LoginForm'
import RegistrationForm from '../../containers/forms/RegistrationForm'
import Fragment from '../../components/Fragment'
import setMessages from '../../utils/setMessages'
import messages from './Header.messages'
import './Header.scss'

interface Props {
  layout?: 'default' | 'compact'
}

const Header = observer(({ layout = 'default' }: Props) => {
  const {
    loginStore,
    wishlistGetProductsStore,
    mobileMenuStore,
    userInfoStore
  } = React.useContext(AppContext)

  const [searchOpen, setSearchOpen] = React.useState(false)
  const [currentTab, setCurrentTab] = React.useState('login')

  const setTab = (newTab: any) => {
    setCurrentTab(newTab)
  }

  const handleOpenSearch = () => {
    setSearchOpen(true)
  }

  const handleCloseSearch = () => {
    setSearchOpen(false)
  }

  const dropdownLogin = () => {
    const tabs = [
      { key: 'login', title: 'Login' },
      { key: 'registration', title: 'Create An Account' }
    ]

    const tabsButtons = tabs.map((tab) => {
      const classes = classNames('modal-title__item', {
        'd-none': currentTab === tab.key
      })

      return <span key={tab.key} onClick={() => setTab(tab.key)} className={classes}>{tab.title}</span>
    })

    const content = !loginStore.loggedIn ? (
      <Fragment>
        <div className='account-menu__form'>
          <Fragment hidden={currentTab === 'registration'}>
            <div className='account-menu__form-title'>Log In to Your Account</div>
            <LoginForm />
          </Fragment>
          <Fragment hidden={currentTab === 'login'}>
            <div className='account-menu__form-title'>Register</div>
            <RegistrationForm />
          </Fragment>
          <div className='account-menu__form-link'>
            {tabsButtons}
          </div>
        </div>
      </Fragment>
    ) : (
      <Fragment>
        <Link to='/account/dashboard' className='account-menu__user'>
          <div className='account-menu__user-avatar'>
            <img src='/assets/img/avatar.png' alt='' />
          </div>
          <div className='account-menu__user-info'>
            {userInfoStore.user ? (
              <Fragment>
                <div className='account-menu__user-name'>{userInfoStore.user.firstname} {userInfoStore.user.lastname}</div>
                <div className='account-menu__user-email'>{userInfoStore.user.email}</div>
              </Fragment>
            ) : null}
          </div>
        </Link>
        <div className='account-menu__divider' />
        <ul className='account-menu__links'>
          <li><Link to='/account/dashboard'>Dashboard</Link></li>
          <li><Link to='/account/password'>Password</Link></li>
        </ul>
        <div className='account-menu__divider' />
        <ul className='account-menu__links'>
          <li><span onClick={() => loginStore.logout()}>Logout</span></li>
        </ul>
      </Fragment>
    )

    return (
      <div className='account-menu'>
        {content}
      </div>
    )
  }

  const header = () => {
    const searchClasses = classNames('mobile-header__search', {
      'mobile-header__search--opened': searchOpen
    })

    const mobileClasses = classNames('mobile-header__menu-button', {
      'mobile-header__menu-button--opened': mobileMenuStore.isOpenMobileMenu
    })

    return (
      <div className='site-header__middle'>
        <div className='container-fluid'>
          <button
            type='button'
            id='nav-toggle'
            className={`${mobileClasses} d-lg-none d-xl-none`}
            onClick={() => mobileMenuStore.openMobileMenu()}
          >
            <span className='sidebarToggle__text'>MENU</span>
          </button>
          <Link className='site-header__logo' to='/'>
            <img src='/assets/img/logos/shop-logo.svg' />
          </Link>
          <div className='site-header__nav-panel d-lg-block d-none'>
            <NavPanel layout={layout} />
          </div>
          <div className='site-header__actions'>
            <Indicator
              className='d-md-block d-lg-block d-xl-block d-none'
              onClick={handleOpenSearch}
              icon={<i className='fas fa-search' />}
            />
            <Indicator
              className='d-md-block d-lg-block d-xl-block d-none'
              icon={<i className='far fa-user' />}
              dropdown={dropdownLogin()}
            />
            <Indicator
              url='/wishlist'
              value={loginStore.loggedIn && wishlistGetProductsStore.productsWishlist ? wishlistGetProductsStore.productsWishlist.length : 0}
              icon={<i className='far fa-heart' />}
            />
            <IndicatorCart />
          </div>
          <Search
            context='mobile-header'
            className={searchClasses}
            onClose={handleCloseSearch}
          />
        </div>
      </div>
    )
  }

  return (
    <div className='site-header'>
      <Topbar />
      {header()}
    </div>
  )
})

export default injectIntl(Header)
