import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { injectIntl } from 'react-intl'
import setMessages from '../../utils/setMessages'
import { Container } from 'reactstrap'
import NavPanel from '../../containers/shared/NavPanel'
import Search from '../../containers/shared/Search'
import Topbar from '../../containers/shared/Topbar'
import Indicator from '../../components/Indicator'
import IndicatorCart from '../../containers/shared/IndicatorCart'
import Fragment from '../../components/Fragment'
import Dropdown from '../../components/Dropdown'
import messages from './Header.messages'
import './Header.scss'

@inject('modalStore', 'loginStore', 'wishlistGetProductsStore')
@observer
class Header extends Component {
  static propTypes = {
    modalStore: PropTypes.any,
    loginStore: PropTypes.any,
    wishlistGetProductsStore: PropTypes.any,
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

  submit = () => {
    this.props.modalStore.openLogin()
  }

  get bannerSection () {
    return (
      <div className='site-header__middle'>
        <Container>
          <div className='site-header__logo'>
            <Link to='/'>
              <img src='/public/img/logos/shop-logo.svg' width='180px' />
            </Link>
          </div>
          <div className='site-header__phone'>
            <div className='site-header__phone-title'>
              {this.messages('phoneLabel')}
            </div>
            <div className='site-header__phone-number'>
              {this.messages('phone')}
            </div>
          </div>
          <div className='site-header__search'>
            <Search />
          </div>
          <div className='site-header__actions'>
            <Fragment hidden={this.props.loginStore.loggedIn}>
              <div className='site-header__item--link'>
                <Link className='site-header-link' to='' onClick={this.submit}>{this.messages('login')}</Link>
              </div>
            </Fragment>
            <Fragment hidden={!this.props.loginStore.loggedIn}>
              <div className='site-header__item'>
                <Dropdown
                  title={this.messages('myAccount')}
                  items={this.accountLinks}
                />
              </div>
            </Fragment>
            <Indicator
              url='/wishlist'
              value={this.props.loginStore.loggedIn && this.props.wishlistGetProductsStore.productsWishlist ? this.props.wishlistGetProductsStore.productsWishlist.length : 0}
              icon={<i className='far fa-heart' />}
            />
            <IndicatorCart />
          </div>
        </Container>
      </div>
    )
  }

  render () {
    const { layout } = this.props

    return (
      <div className='site-header'>
        <Topbar />
        {this.bannerSection}
        <div className='site-header__nav-panel'>
          <NavPanel layout={layout} />
        </div>
      </div>
    )
  }
}

export default injectIntl(Header)
