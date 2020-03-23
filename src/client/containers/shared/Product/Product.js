import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import Fragment from '../../../components/Fragment'
import InputNumber from '../../../components/InputNumber'
import ProductGallery from '../ProductGallery'
import Rating from '../../../components/Rating'
import Button from '../../../components/Button'
// import messages from './Product.messages'
import { setCurrencies } from '../../../translations/currencies.messages'
import './Product.scss'

@inject('currencyStore', 'cartAddProductStore')
@observer
class Product extends Component {
  static propTypes = {
    currencyStore: PropTypes.any.isRequired,
    cartAddProductStore: PropTypes.any.isRequired,
    product: PropTypes.object.isRequired,
    layout: PropTypes.oneOf(['standard', 'sidebar', 'columnar', 'quickview'])
  }

  static defaultProps = {
    layout: 'standard'
  }

  currencies = setCurrencies(this)

  constructor (props) {
    super(props)

    this.state = {
      quantity: 1
    }
  }

  handleChangeQuantity = quantity => {
    this.setState({ quantity })
  }

  get images () {
    const images = []
    this.props.product.images.map(item => images.push(item.src))
    return images
  }

  get prices () {
    const { product } = this.props
    const { currency } = this.props.currencyStore
    let prices

    if (product.sale_price) {
      prices = (
        <React.Fragment>
          <span className='product__new-price'>
            {this.currencies('value', {
              value: product.regular_price,
              currency: this.currencies(currency)
            })}
          </span>{' '}
          <span className='product__old-price'>
            {this.currencies('value', {
              value: product.sale_price,
              currency: this.currencies(currency)
            })}
          </span>
        </React.Fragment>
      )
    } else {
      prices = this.currencies('value', {
        value: product.price,
        currency: this.currencies(currency)
      })
    }

    return prices
  }

  get brands () {
    const brands = this.props.product.brands

    return brands ? brands.map((item, index) => {
      return (
        <Link key={index} to='/'>{item.name}</Link>
      )
    }) : null
  }

  get attributeSize () {
    const product = this.props.product
    let attributeSize = []
    product.attributes.map((item, index) => {
      if (item.name === 'Size') {
        attributeSize = item.options
      }
    })

    const options = ['40', '41', '42', '43', '44'].map((size, index) => {
      return (
        <label key={index}>
          <input type='radio' name='material' disabled={['42', '43', '44'].includes(size) ? 'disabled' : null} />
          <span>{size}</span>
        </label>
      )
    })

    return attributeSize.length ? (
      <Fragment>
        <div className='product__option-label'>Size</div>
        <div className='input-radio-label'>
          <div className='input-radio-label__list'>
            {options}
          </div>
        </div>
      </Fragment>
    ) : null
  }

  get attributeColor () {
    const product = this.props.product
    const attributeColor = []
    product.attributes.map((item) => {
      if (item.name === 'Color') {
        item.options.map((item, index) => {
          attributeColor.push(
            <label
              key={index}
              className='input-radio-color__item input-radio-color__item'
              style={{ color: item }}
              data-toggle='tooltip'
              title='White'
            >
              <input type='radio' name='color' />
              <span />
            </label>
          )
        })
      }
    })

    return attributeColor.length ? (
      <Fragment>
        <div className='product__option-label'>Color</div>
        <div className='input-radio-color'>
          <div className='input-radio-color__list'>
            {attributeColor}
          </div>
        </div>
      </Fragment>
    ) : null
  }

  get categories () {
    const categories = this.props.product.categories

    const tags = categories ? categories.map((item, index) => {
      return (
        <Link key={index} to={`/category/${item.name.toLowerCase()}`}>{item.name}</Link>
      )
    }) : null

    return (
      <div className='product__tags tags'>
        <div className='tags__list'>
          {tags}
        </div>
      </div>
    )
  }

  render () {
    const { product, layout } = this.props
    const { quantity } = this.state

    return (
      <div className={`product product--layout--${layout}`}>
        <div className='product__content'>
          <ProductGallery layout={layout} images={this.images} />

          <div className='product__info'>
            <div className='product__wishlist-compare'>
              <button
                type='button'
                data-toggle='tooltip'
                data-placement='right'
                title='Wishlist'
                className={'btn btn-sm btn-light btn-svg-icon'}
              >
                <i className='fas fa-heart' />
              </button>
            </div>
            <h1 className='product__name'>{product.name}</h1>
            <div className='product__rating'>
              <div className='product__rating-stars'>
                <Rating value={product.rating_count} />
              </div>
              <div className='product__rating-legend'>
                <Link to='/'>{`${product.rating_count} Reviews`}</Link>
                <span>/</span>
                <Link to='/'>Write A Review</Link>
              </div>
            </div>
            <div className='product__description'>{product.description}</div>
            <ul className='product__features'>
              <li>Speed: 750 RPM</li>
              <li>Power Source: Cordless-Electric</li>
              <li>Battery Cell Type: Lithium</li>
              <li>Voltage: 20 Volts</li>
              <li>Battery Capacity: 2 Ah</li>
            </ul>
            <ul className='product__meta'>
              <li className='product__meta-availability'>
                Availability:{' '}
                <span className='text-success'>{product.stock_status}</span>
              </li>
              <li>
                Brand: {this.brands}
              </li>
              <li>SKU: {this.props.product.sku}</li>
            </ul>
          </div>

          <div className='product__sidebar'>
            <div className='product__prices'>{this.prices}</div>

            <form className='product__options'>
              <div className='form-group product__option'>
                {this.attributeColor}
              </div>
              <div className='form-group product__option'>
                {this.attributeSize}
              </div>
              <div className='form-group product__option'>
                <label
                  htmlFor='product-quantity'
                  className='product__option-label'
                >
                  Quantity
                </label>
                <div className='product__actions'>
                  <div className='product__actions-item'>
                    <InputNumber
                      id='product-quantity'
                      aria-label='Quantity'
                      className='product__quantity'
                      size='lg'
                      min={1}
                      value={quantity}
                      onChange={this.handleChangeQuantity}
                    />
                  </div>
                  <div className='product__actions-item product__actions-item--addtocart'>
                    <Button
                      variant='primary'
                      onClick={() => this.props.cartAddProductStore.addProduct(product.id, quantity)}
                      className={'btn btn-primary btn-lg'}
                    >
                      Add To Cart
                    </Button>
                  </div>
                  <div className='product__actions-item product__actions-item--wishlist'>
                    <button
                      type='button'
                      data-toggle='tooltip'
                      title='Wishlist'
                      className={'btn btn-secondary btn-svg-icon btn-lg'}
                    >
                      <i className='fas fa-heart' />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className='product__footer'>
            {this.categories}

            <div className='product__share-links share-links'>
              <ul className='share-links__list'>
                <li className='share-links__item share-links__item--type--like'>
                  <Link to='/'>Like</Link>
                </li>
                <li className='share-links__item share-links__item--type--tweet'>
                  <Link to='/'>Tweet</Link>
                </li>
                <li className='share-links__item share-links__item--type--pin'>
                  <Link to='/'>Pin It</Link>
                </li>
                <li className='share-links__item share-links__item--type--counter'>
                  <Link to='/'>4K</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default injectIntl(Product)
