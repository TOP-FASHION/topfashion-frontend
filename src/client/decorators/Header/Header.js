import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { injectIntl } from 'react-intl'
import classNames from 'classnames'
import setMessages from '../../utils/setMessages'
import NavPanel from '../../containers/header/NavPanel'
import Search from '../../containers/header/Search'
import Topbar from '../../containers/header/Topbar'
import Indicator from '../../components/Indicator'
import IndicatorCart from '../../containers/header/IndicatorCart'
import LoginForm from '../../containers/forms/LoginForm'
import RegistrationForm from '../../containers/forms/RegistrationForm'
import Fragment from '../../components/Fragment'
import messages from './Header.messages'
import './Header.scss'

@inject('modalStore', 'loginStore', 'wishlistGetProductsStore', 'mobileMenuStore', 'userInfoStore')
@observer
class Header extends Component {
  constructor (props) {
    super(props)

    this.state = {
      searchOpen: false,
      currentTab: 'login'
    }
  }

  static propTypes = {
    modalStore: PropTypes.any,
    loginStore: PropTypes.any,
    wishlistGetProductsStore: PropTypes.any,
    mobileMenuStore: PropTypes.any,
    userInfoStore: PropTypes.any,
    /** one of ['default', 'compact'] (default: 'default') */
    layout: PropTypes.oneOf(['default', 'compact'])
  }

  static defaultProps = {
    layout: 'default'
  }

  messages = setMessages(this, messages, 'app.header.')

  setTab = (newTab) => {
    this.setState(() => ({ currentTab: newTab }))
  };

  openLoginModal = () => {
    this.props.modalStore.openLogin()
  }

  handleOpenSearch = () => {
    this.setState(() => ({ searchOpen: true }))
  };

  handleCloseSearch = () => {
    this.setState(() => ({ searchOpen: false }))
  };

  get user () {
    return this.props.userInfoStore.user
  }

  get dropdownLogin () {
    const { currentTab } = this.state

    const tabs = [
      { key: 'login', title: 'Login' },
      { key: 'registration', title: 'Create An Account' }
    ]

    const tabsButtons = tabs.map((tab) => {
      const classes = classNames('modal-title__item', {
        'd-none': currentTab === tab.key
      })

      return <span key={tab.key} onClick={() => this.setTab(tab.key)} className={classes}>{tab.title}</span>
    })

    const content = !this.props.loginStore.loggedIn ? (
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
            {this.user ? (
              <Fragment>
                <div className='account-menu__user-name'>{this.user.firstname} {this.user.lastname}</div>
                <div className='account-menu__user-email'>{this.user.email}</div>
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
          <li><span onClick={() => this.props.loginStore.logout()}>Logout</span></li>
        </ul>
      </Fragment>
    )

    return (
      <div className='account-menu'>
        {content}
      </div>
    )
  }

  get header () {
    const { layout } = this.props

    const { searchOpen } = this.state
    const searchClasses = classNames('mobile-header__search', {
      'mobile-header__search--opened': searchOpen
    })

    const mobileClasses = classNames('mobile-header__menu-button', {
      'mobile-header__menu-button--opened': this.props.mobileMenuStore.isOpenMobileMenu
    })

    return (
      <div className='site-header__middle'>
        <div className='container-fluid'>
          <button
            type='button'
            id='nav-toggle'
            className={`${mobileClasses} d-lg-none d-xl-none`}
            onClick={() => this.props.mobileMenuStore.openMobileMenu()}
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
              onClick={this.handleOpenSearch}
              icon={<i className='fas fa-search' />}
            />
            <Indicator
              className='d-md-block d-lg-block d-xl-block d-none'
              icon={<i className='far fa-user' />}
              dropdown={this.dropdownLogin}
            />
            <Indicator
              url='/wishlist'
              value={this.props.loginStore.loggedIn && this.props.wishlistGetProductsStore.productsWishlist ? this.props.wishlistGetProductsStore.productsWishlist.length : 0}
              icon={<i className='far fa-heart' />}
            />
            <IndicatorCart />
          </div>
          <Search
            context='mobile-header'
            className={searchClasses}
            onClose={this.handleCloseSearch}
          />
        </div>
      </div>
    )
  }

  render () {
    return (
      <div className='site-header'>
        <Topbar />
        {this.header}
      </div>
    )
  }
}

export default injectIntl(Header)
