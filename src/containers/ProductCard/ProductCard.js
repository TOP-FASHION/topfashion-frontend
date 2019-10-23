import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import setMessages from '../../utils/setMessages'
import messages from './ProductCard.messages'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import './ProductCard.scss'
import { inject, observer } from 'mobx-react'
import Button from '../../components/Button'
import Rating from '../../components/Rating'

@inject('currencyStore', 'productCartAddStore', 'modalStore')
@observer
class ProductCard extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
    replace: PropTypes.bool,
    layout: PropTypes.string
  }

  messages = setMessages(this, messages, 'app.productCard.')

  get containerClasses () {
    return classNames('product-card', {
      'product-card--layout--grid product-card--size--sm':
        this.layout === 'grid-sm',
      'product-card--layout--grid product-card--size--nl':
        this.layout === 'grid-nl',
      'product-card--layout--grid product-card--size--lg':
        this.layout === 'grid-lg',
      'product-card--layout--list': this.layout === 'list',
      'product-card--layout--horizontal': this.layout === 'horizontal'
    })
  }

  get badges () {
    const product = this.props.product
    const badges = []
    product.tags.map((item, index) =>
      badges.push(
        <div
          key='sale'
          className={`product-card__badge product-card__badge--${item.name}`}
        >
          ${item.name}
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
        <Link to={`/shop/product/${product.id}`}>
          <img src={product.images[0].src} alt='' />
        </Link>
      </div>
    ) : (
      <div className='product-card__image'>
        <Link to={`/shop/product/${product.id}`}>
          <img src={'public/img/products/default.jpg'} alt='' />
        </Link>
      </div>
    )
  }

  get price () {
    const { currency } = this.props.currencyStore
    const product = this.props.product

    return product.sale_price ? (
      <div className='product-card__prices'>
        <span className='product-card__new-price'>
          {currency} {product.regular_price}
        </span>{' '}
        <span className='product-card__old-price'>
          {currency} {product.sale_price}
        </span>
      </div>
    ) : (
      <div className='product-card__prices'>
        {currency} {product.price}
      </div>
    )
  }

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

  render () {
    const { product } = this.props

    return (
      <div className={this.containerClasses}>
        <button
          onClick={() => this.props.modalStore.openProduct(product.id)}
          className={'product-card__quickview'}
        >
          <i className='fas fa-expand' />
        </button>
        {this.badges}
        {this.image}
        <div className='product-card__info'>
          <div className='product-card__name'>
            <Link to={`/shop/product/${product.id}`}>{product.name}</Link>
          </div>
          <div className='product-card__rating'>
            <Rating value={product.rating_count} />
            <div className=' product-card__rating-legend'>{`${product.rating_count} Reviews`}</div>
          </div>
          {this.features}
        </div>
        <div className='product-card__actions'>
          <div className='product-card__availability'>
            Availability:
            <span className='text-success'>In Stock</span>
          </div>
          {this.price}
          <div className='product-card__buttons'>
            <Button
              variant='primary'
              onClick={() => this.props.productCartAddStore.addProduct(product.id)}
              className={'product-card__addtocart'}
            >
              Add To Cart
            </Button>
            <Button
              variant='secondary'
              className={'product-card__addtocart product-card__addtocart--list'}
            >
              Add To Cart
            </Button>
            <Button
              className={'btn btn-light btn-svg-icon btn-svg-icon--fake-svg product-card__wishlist'}
            >
              <i className='fas fa-heart' />
            </Button>
            <Button
              className={'btn btn-light btn-svg-icon btn-svg-icon--fake-svg product-card__compare'}
            >
              <i className='fas fa-exchange-alt' />
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default injectIntl(ProductCard)
