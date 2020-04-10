import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { injectIntl } from 'react-intl'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import setMessages from '../../../utils/setMessages'
import { setCurrencies } from '../../../translations/currencies.messages'
import messages from './ProductCard.messages'
import Button from '../../../components/Button'
// import Rating from '../../../components/Rating'
import './ProductCard.scss'

@inject('currencyStore', 'cartAddProductStore', 'modalStore', 'loginStore', 'wishlistAddProductStore')
@observer
class ProductCard extends Component {
  static propTypes = {
    currencyStore: PropTypes.any.isRequired,
    cartAddProductStore: PropTypes.any.isRequired,
    modalStore: PropTypes.any.isRequired,
    loginStore: PropTypes.any.isRequired,
    wishlistAddProductStore: PropTypes.any.isRequired,
    /**
     * product object
     */
    product: PropTypes.object.isRequired,
    /**
     * product card layout
     * one of ['grid-sm', 'grid-nl', 'grid-lg', 'list', 'horizontal']
     */
    layout: PropTypes.oneOf(['grid-sm', 'grid-nl', 'grid-lg', 'list', 'horizontal'])
  }

  //messages = setMessages(this, messages, 'app.productCard.')

  //currencies = setCurrencies(this)

  get containerClasses () {
    return classNames('product-card', {
      'product-card--layout--grid product-card--size--sm': this.props.layout === 'grid-sm',
      'product-card--layout--grid product-card--size--nl': this.props.layout === 'grid-nl',
      'product-card--layout--grid product-card--size--lg': this.props.layout === 'grid-lg',
      'product-card--layout--list': this.props.layout === 'list',
      'product-card--layout--horizontal': this.props.layout === 'horizontal'
    })
  }

  get badges () {
    const product = this.props.product
    const badges = []
    product.tags.map((item) =>
      badges.push(
        <div
          key={item.id}
          className={`product-card__badge product-card__badge--${item.slug}`}
        >
          {item.name}
        </div>
      )
    )

    return badges.length ? (
      <div className='product-card__badges-list'>{badges}</div>
    ) : null
  }

  get image () {
    const product = this.props.product
    return product.images && product.images.length > 0 ? (
      <div className='product-card__image'>
        <Link to={`/category/product/${product.id}`}>
          <img className='product-card__image--primary' src={product.images[0].src} alt='' />
          <img className='product-card__image--optional' src={product.images[1].src} alt='' />
        </Link>
        <div className='product-card__quick'>
          <button
            onClick={() => this.props.modalStore.openProduct(product.id)}
            className={'product-card__quickview'}
          >
            Quick view
          </button>
        </div>
      </div>
    ) : (
      <div className='product-card__image'>
        <Link to={`/category/product/${product.id}`}>
          <img src={'/assets/img/products/default.jpg'} alt='' />
        </Link>
      </div>
    )
  }

  // get price () {
  //   const { currency } = this.props.currencyStore
  //   const product = this.props.product
  //
  //   return product.sale_price ? (
  //     <div className='product-card__prices'>
  //       <span className='product-card__new-price'>
  //         {this.currencies('value', {
  //           value: product.regular_price,
  //           currency: this.currencies(currency)
  //         })}
  //       </span>{' '}
  //       <span className='product-card__old-price'>
  //         {this.currencies('value', {
  //           value: product.sale_price,
  //           currency: this.currencies(currency)
  //         })}
  //       </span>
  //     </div>
  //   ) : (
  //     <div className='product-card__prices'>
  //       {this.currencies('value', {
  //         value: product.price,
  //         currency: this.currencies(currency)
  //       })}
  //     </div>
  //   )
  // }

  get features () {
    const product = this.props.product
    return product.features && product.features.length ? (
      <ul className='product-card__features-list'>
        {product.features.map((feature, index) => (
          <li key={index}>{`${feature.name}: ${feature.value}`}</li>
        ))}
      </ul>
    ) : null
  }

  get attributeSize () {
    const product = this.props.product
    let attributeSize = []
    product.attributes.map((item, index) => {
      if (item.name === 'Size') {
        attributeSize = item.options
      }
    })

    return attributeSize.length ? (
      <div className='product-card__size'>Size: {attributeSize.join(', ')}</div>
    ) : null
  }

  get attributeColor () {
    const product = this.props.product
    const attributeColor = []
    product.attributes.map((item, index) => {
      if (item.name === 'Color') {
        item.options.map((item, index) => {
          attributeColor.push(
            <span
              key={index}
              className={`product-card__color-item product-card__color-item--${item}`}
              style={{ backgroundColor: item }}
              title={item}
            />
          )
        })
      }
    })

    return attributeColor.length ? (
      <div className='product-card__color'>
        {attributeColor}
      </div>
    ) : null
  }

  render () {
    const { product } = this.props

    return (
      <div className={this.containerClasses}>
        <div className='product-card__buttons'>
          {/*
          <Button
            className={'btn__addtocart'}
            onClick={() => this.props.cartAddProductStore.addProduct(product.id)}
          >
            <i className='fas fa-shopping-cart' />
          </Button>
          */}
          <Button
            className={'btn__wishlist'}
            onClick={() => (
              this.props.loginStore.loggedIn
                ? this.props.wishlistAddProductStore.addProduct(product.id)
                : this.props.modalStore.openLogin()
            )}
          >
            <i className='far fa-heart' />
          </Button>
        </div>
        {this.badges}
        {this.image}
        {this.attributeColor}
        <div className='product-card__info'>
          <div className='product-card__name'>
            <Link to={`/category/product/${product.id}`}>{product.name}</Link>
          </div>
          {/*{this.price}*/}
          {/*
          <div className='product-card__rating'>
            <div className=' product-card__rating-legend'>{`Review: ${product.rating_count}`}</div>
            <Rating value={product.rating_count} />
          </div>
          */}
          {this.features}
        </div>
      </div>
    )
  }
}

export default injectIntl(ProductCard)
