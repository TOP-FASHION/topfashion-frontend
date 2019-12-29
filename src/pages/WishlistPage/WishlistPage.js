import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { injectIntl } from 'react-intl'
import PageHeader from '../../containers/PageHeader'
import Rating from '../../components/Rating'
import Button from '../../components/Button'
import { setCurrencies } from '../../translations/currencies.messages'
import './WishlistPage.scss'

@inject('wishlistGetProductsStore', 'cartAddProductStore', 'currencyStore', 'wishlistRemoveProductStore')
@observer
class WishlistPage extends Component {
  static propTypes = {
    wishlistGetProductsStore: PropTypes.any.isRequired,
    cartAddProductStore: PropTypes.any.isRequired,
    currencyStore: PropTypes.any,
    wishlistRemoveProductStore: PropTypes.any
  }

  currencies = setCurrencies(this)

  render () {
    const { productsWishlist } = this.props.wishlistGetProductsStore
    const { currency } = this.props.currencyStore
    const breadcrumb = [
      { title: 'Home', url: '' },
      { title: 'Wishlist', url: '' }
    ]

    let content

    if (productsWishlist && productsWishlist.length) {
      const itemsList = productsWishlist.map((item) => {
        // let image

        // if (item.images && item.images.length > 0) {
        //   image = (
        //     <Link to={`/shop/product/${item.id}`}>
        //       <img src={item.images[0]} alt='' />
        //     </Link>
        //   )
        // }

        return (
          <tr key={item.item_id} className='wishlist__row'>
            <td className='wishlist__column wishlist__column--image'>
              {/* {image} */}
            </td>
            <td className='wishlist__column wishlist__column--product'>
              <Link to={`/shop/product/${item.item_id}`} className='wishlist__product-name'>{item.name}</Link>
              <div className='wishlist__product-rating'>
                <Rating value={item.rating} />
                <div className='wishlist__product-rating-legend'>{`${item.reviews} Reviews`}</div>
              </div>
            </td>
            <td className='wishlist__column wishlist__column--stock'>
              <div className='badge badge-success'>In Stock</div>
            </td>
            <td className='wishlist__column wishlist__column--price'>
              {this.currencies('value', {
                value: item.price,
                currency: this.currencies(currency)
              })}
            </td>
            <td className='wishlist__column wishlist__column--tocart'>
              <Button
                variant='primary'
                onClick={() => this.props.cartAddProductStore.addProduct(item.item_id)}
                className={'btn btn-sm'}
              >
                Add To Cart
              </Button>
            </td>
            <td className='wishlist__column wishlist__column--remove'>
              <Button
                variant='primary'
                onClick={() => this.props.wishlistRemoveProductStore.removeProduct(item.item_id)}
                className={'btn btn-light btn-sm btn-svg-icon'}
              >
                <i className='far fa-window-close' />
              </Button>
            </td>
          </tr>
        )
      })

      content = (
        <div className='block'>
          <div className='container'>
            <table className='wishlist'>
              <thead className='wishlist__head'>
                <tr className='wishlist__row'>
                  <th className='wishlist__column wishlist__column--image'>Image</th>
                  <th className='wishlist__column wishlist__column--product'>Product</th>
                  <th className='wishlist__column wishlist__column--stock'>Stock Status</th>
                  <th className='wishlist__column wishlist__column--price'>Price</th>
                  <th className='wishlist__column wishlist__column--tocart' aria-label='Add to cart' />
                  <th className='wishlist__column wishlist__column--remove' aria-label='Remove' />
                </tr>
              </thead>
              <tbody className='wishlist__body'>
                {itemsList}
              </tbody>
            </table>
          </div>
        </div>
      )
    } else {
      content = (
        <div className='block block-empty'>
          <div className='container'>
            <div className='block-empty__body'>
              <div className='block-empty__message'>Your wish list is empty!</div>
              <div className='block-empty__actions'>
                <Link to='/' className='btn btn-primary btn-sm'>Continue</Link>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <React.Fragment>
        <PageHeader header='Wishlist' breadcrumb={breadcrumb} />
        {content}
      </React.Fragment>
    )
  }
}

export default injectIntl(WishlistPage)
