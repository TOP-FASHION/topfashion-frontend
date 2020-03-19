import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import Indicator from '../../components/Indicator'
import Search from '../../containers/shared/Search'
import './MobileHeader.scss'

@inject('cartCountProductsStore', 'wishlistGetProductsStore', 'loginStore', 'mobileMenuStore')
@observer
class MobileHeader extends Component {
  constructor (props) {
    super(props)

    this.state = {
      searchOpen: false
    }
  }

  static propTypes = {
    cartCountProductsStore: PropTypes.object.isRequired,
    wishlistGetProductsStore: PropTypes.any,
    loginStore: PropTypes.any,
    mobileMenuStore: PropTypes.any
  }

  componentDidMount () {
    document.addEventListener('mousedown', this.handleOutsideClick)
  }

  componentDidUpdate (prevProps, prevState) {
    const { searchOpen } = this.state

    if (searchOpen && searchOpen !== prevState.searchOpen && this.searchInputRef) {
      this.searchInputRef.focus()
    }
  }

  componentWillUnmount () {
    document.removeEventListener('mousedown', this.handleOutsideClick)
  }

  handleOutsideClick = (event) => {
    if (this.searchWrapperRef && !this.searchWrapperRef.contains(event.target)) {
      this.setState(() => ({ searchOpen: false }))
    }
  };

  handleOpenSearch = () => {
    this.setState(() => ({ searchOpen: true }))
  };

  handleCloseSearch = () => {
    this.setState(() => ({ searchOpen: false }))
  };

  render () {
    const { productsCartCountItems } = this.props.cartCountProductsStore
    const { searchOpen } = this.state
    const searchClasses = classNames('mobile-header__search', {
      'mobile-header__search--opened': searchOpen
    })

    return (
      <div className='mobile-header'>
        <div className='mobile-header__panel'>
          <div className='container'>
            <div className='mobile-header__body'>
              <button type='button' className='mobile-header__menu-button' onClick={() => this.props.mobileMenuStore.openMobileMenu()}>
                <i className='fas fa-bars' />
              </button>
              <Link to='/' className='mobile-header__logo'>
                <img src='/assets/img/logos/shop-logo.svg' width='100px' />
              </Link>
              <Search
                context='mobile-header'
                className={searchClasses}
                onClose={this.handleCloseSearch}
              />
              <div className='mobile-header__indicators'>
                <Indicator
                  className='indicator--mobile indicator--mobile-search d-md-none'
                  onClick={this.handleOpenSearch}
                  icon={<i className='fas fa-search' />}
                />
                <Indicator
                  className='indicator--mobile d-sm-flex d-none'
                  url='/wishlist'
                  value={this.props.loginStore.loggedIn && this.props.wishlistGetProductsStore.productsWishlist ? this.props.wishlistGetProductsStore.productsWishlist.length : 0}
                  icon={<i className='far fa-heart' />}
                />
                <Indicator
                  className='indicator--mobile'
                  url='/shop/cart'
                  value={productsCartCountItems}
                  icon={<i className='fas fa-shopping-cart' />}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MobileHeader
