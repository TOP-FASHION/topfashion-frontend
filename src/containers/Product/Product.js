import React, { Component } from 'react'
// import classNames from 'classnames'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
// import messages from './Product.messages'
import { Link } from 'react-router-dom'
import InputNumber from '../../components/InputNumber'
import ProductGallery from '../ProductGallery'
import Rating from '../../components/Rating'
import Button from '../../components/Button'
import './Product.scss'
import { inject, observer } from 'mobx-react'

@inject('currencyStore', 'cartAddProductStore')
@observer
class Product extends Component {
  static propTypes = {
    currencyStore: PropTypes.any.isRequired,
    cartAddProductStore: PropTypes.any.isRequired,
    /** product object */
    product: PropTypes.object.isRequired,
    /** one of ['standard', 'sidebar', 'columnar', 'quickview'] (default: 'standard') */
    layout: PropTypes.oneOf(['standard', 'sidebar', 'columnar', 'quickview'])
  }

  static defaultProps = {
    layout: 'standard'
  }

  constructor (props) {
    super(props)

    this.state = {
      quantity: 1
    }
  }

  componentDidMount () {

  }

  handleChangeQuantity = quantity => {
    this.setState({ quantity })
  }

  get images () {
    const images = []
    this.props.product.images.map(item => images.push(item.src))
    return images
  }

  render () {
    const { product, layout } = this.props
    const { quantity } = this.state
    const { currency } = this.props.currencyStore
    let prices

    if (product.sale_price) {
      prices = (
        <React.Fragment>
          <span className='product__new-price'>
            {currency} {product.regular_price}
          </span>{' '}
          <span className='product__old-price'>
            {currency} {product.sale_price}
          </span>
        </React.Fragment>
      )
    } else {
      prices = `${currency} ${product.price}`
    }

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
              <button
                type='button'
                data-toggle='tooltip'
                data-placement='right'
                title='Compare'
                className={'btn btn-sm btn-light btn-svg-icon'}
              >
                <i className='fas fa-exchange-alt' />
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
                Brand:
                <Link to='/'>Wakita</Link>
              </li>
              <li>SKU: 83690/32</li>
            </ul>
          </div>

          <div className='product__sidebar'>
            <div className='product__availability'>
              Availability: <span className='text-success'>In Stock</span>
            </div>

            <div className='product__prices'>{prices}</div>

            <form className='product__options'>
              <div className='form-group product__option'>
                <div className='product__option-label'>Color</div>
                <div className='input-radio-color'>
                  <div className='input-radio-color__list'>
                    <label
                      className='input-radio-color__item input-radio-color__item--white'
                      style={{ color: '#fff' }}
                      data-toggle='tooltip'
                      title='White'
                    >
                      <input type='radio' name='color' />
                      <span />
                    </label>
                    <label
                      className='input-radio-color__item'
                      style={{ color: '#ffd333' }}
                      data-toggle='tooltip'
                      title='Yellow'
                    >
                      <input type='radio' name='color' />
                      <span />
                    </label>
                    <label
                      className='input-radio-color__item'
                      style={{ color: '#ff4040' }}
                      data-toggle='tooltip'
                      title='Red'
                    >
                      <input type='radio' name='color' />
                      <span />
                    </label>
                    <label
                      className='input-radio-color__item input-radio-color__item--disabled'
                      style={{ color: '#4080ff' }}
                      data-toggle='tooltip'
                      title='Blue'
                    >
                      <input type='radio' name='color' disabled />
                      <span />
                    </label>
                  </div>
                </div>
              </div>
              <div className='form-group product__option'>
                <div className='product__option-label'>Material</div>
                <div className='input-radio-label'>
                  <div className='input-radio-label__list'>
                    <label>
                      <input type='radio' name='material' />
                      <span>Metal</span>
                    </label>
                    <label>
                      <input type='radio' name='material' />
                      <span>Wood</span>
                    </label>
                    <label>
                      <input type='radio' name='material' disabled />
                      <span>Plastic</span>
                    </label>
                  </div>
                </div>
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
                  <div className='product__actions-item product__actions-item--compare'>
                    <button
                      type='button'
                      data-toggle='tooltip'
                      title='Compare'
                      className={'btn btn-secondary btn-svg-icon btn-lg'}
                    >
                      <i className='fas fa-exchange-alt' />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className='product__footer'>
            <div className='product__tags tags'>
              <div className='tags__list'>
                <Link to='/'>Mounts</Link>
                <Link to='/'>Electrodes</Link>
                <Link to='/'>Chainsaws</Link>
              </div>
            </div>

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
