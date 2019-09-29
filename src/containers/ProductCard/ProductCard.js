import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import setMessages from '../../utils/setMessages'
import messages from './ProductCard.messages'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import './ProductCard.scss'

class ProductCard extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
    replace: PropTypes.bool,
    layout: PropTypes.string
  }

  messages = setMessages(this, messages, 'app.productCard.')

  get containerClasses(){
    return classNames('product-card', {
      'product-card--layout--grid product-card--size--sm': this.layout === 'grid-sm',
      'product-card--layout--grid product-card--size--nl': this.layout === 'grid-nl',
      'product-card--layout--grid product-card--size--lg': this.layout === 'grid-lg',
      'product-card--layout--list': this.layout === 'list',
      'product-card--layout--horizontal': this.layout === 'horizontal',
    })
  }

  get badges () {
    let product = this.props.product
    let badges = []
    product.tags.map((item, index) => (
      badges.push(<div key="sale" className={`product-card__badge product-card__badge--${item.name}`}>${item.name}</div>)
    ))

    return badges.length ? <div className="product-card__badges-list">{badges}</div> : null;
  }

  get image () {
    let product = this.props.product
    return product.images && product.images.length > 0 ? (
      <div className="product-card__image">
        <Link to={`/shop/product/${product.id}`}><img src={product.images[0].src} alt="" /></Link>
      </div>
    ) : (
      <div className="product-card__image">
        <Link to={`/shop/product/${product.id}`}><img src={'public/img/products/default.jpg'} alt="" /></Link>
      </div>
    )
  }

  get price () {
    let product = this.props.product
    return product.compareAtPrice ? (
      <div className="product-card__prices">
        <span className="product-card__new-price"><Currency value={product.price} /></span>
        {' '}
        <span className="product-card__old-price"><Currency value={product.compareAtPrice} /></span>
      </div>
    ) : (
      <div className="product-card__prices">
        {/*<Currency value={product.price} />*/}
      </div>
    )
  }

  get features () {
    let product = this.props.product
    return product.features && product.features.length ? (
      <ul className="product-card__features-list">
        {product.features.map((feature, index) => (
          <li key={index}>{`${feature.name}: ${feature.value}`}</li>
        ))}
      </ul>
    ) : null
  }

  get raiting () {
    let product = this.props.product
    const stars = [1, 2, 3, 4, 5].map((rating) => {
      const rootClasses = classNames('rating__star', {
        'rating__star--active': product.rating_count >= rating,
      });

      return '';
    });

    return (
      <div className="rating">
        <div className="rating__body">
          {stars}
        </div>
      </div>
    );
  }

  render () {
    const { product } = this.props
    return (
      <div className={this.containerClasses}>
        <button
          type="button"
          className={classNames('product-card__quickview')}
        >
          <i className="fas fa-expand"></i>
        </button>
        {this.badges}
        {this.image}
        <div className="product-card__info">
          <div className="product-card__name">
            <Link to={`/shop/product/${product.id}`}>{product.name}</Link>
          </div>
          <div className="product-card__rating">
            {this.raiting}
            <div className=" product-card__rating-legend">{`${product.reviews_allowed} Reviews`}</div>
          </div>
          {this.features}
        </div>
        <div className="product-card__actions">
          <div className="product-card__availability">
            Availability:
            <span className="text-success">In Stock</span>
          </div>
          {this.price}
          <div className="product-card__buttons">
            <button
              type="button"
              className={classNames('btn btn-primary product-card__addtocart', {
                'btn-loading': 'loading',
              })}
            >
              Add To Cart
            </button>
            <button
              type="button"
              className={classNames('btn btn-secondary product-card__addtocart product-card__addtocart--list', {
                'btn-loading': 'loading',
              })}
            >
              Add To Cart
            </button>
            <button
              type="button"
              className={classNames('btn btn-light btn-svg-icon btn-svg-icon--fake-svg product-card__wishlist', {
                'btn-loading': 'loading',
              })}
            >
              <i className="fas fa-heart"></i>
            </button>
            <button
              type="button"
              className={classNames('btn btn-light btn-svg-icon btn-svg-icon--fake-svg product-card__compare', {
                'btn-loading': 'loading',
              })}
            >
              <i className="fas fa-exchange-alt"></i>
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default injectIntl(ProductCard)
