import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { injectIntl } from 'react-intl'
import classNames from "classnames"
import setMessages from '../../utils/setMessages'
import NavPanel from '../../containers/shared/NavPanel'
import Search from '../../containers/shared/Search'
import Topbar from '../../containers/shared/Topbar'
import Indicator from '../../components/Indicator'
import IndicatorCart from '../../containers/shared/IndicatorCart'
import Fragment from '../../components/Fragment'
import Dropdown from '../../components/Dropdown'
import messages from './Header.messages'
import './Header.scss'

@inject('modalStore', 'loginStore', 'wishlistGetProductsStore', 'mobileMenuStore')
@observer
class Header extends Component {
  constructor (props) {
    super(props)

    this.state = {
      searchOpen: false
    }
  }

  static propTypes = {
    modalStore: PropTypes.any,
    loginStore: PropTypes.any,
    wishlistGetProductsStore: PropTypes.any,
    mobileMenuStore: PropTypes.any,
    /** one of ['default', 'compact'] (default: 'default') */
    layout: PropTypes.oneOf(['default', 'compact'])
  }

  static defaultProps = {
    layout: 'default'
  }

  messages = setMessages(this, messages, 'app.header.')

  accountLinks = [
    { title: 'Dashboard', url: '/account/dashboard' },
    { title: 'Edit Profile', url: '/account/profile' },
    { title: 'Order History', url: '/account/orders' },
    { title: 'Addresses', url: '/account/addresses' },
    { title: 'Password', url: '/account/password' },
    { title: 'Logout', url: '/logout' }
  ];

  openLoginModal = () => {
    this.props.modalStore.openLogin()
  }

  handleOpenSearch = () => {
    this.setState(() => ({ searchOpen: true }))
  };

  handleCloseSearch = () => {
    this.setState(() => ({ searchOpen: false }))
  };

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
            <Fragment hidden={!this.props.loginStore.loggedIn}>
              <div className='site-header__item'>
                <Dropdown
                  title={this.messages('myAccount')}
                  items={this.accountLinks}
                />
              </div>
            </Fragment>
            <Indicator
              className='d-md-block d-lg-block d-xl-block d-none'
              onClick={this.handleOpenSearch}
              icon={<i className='fas fa-search' />}
            />
            <Indicator
              className='d-md-block d-lg-block d-xl-block d-none'
              onClick={this.openLoginModal}
              icon={<i className='far fa-user' />}
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
