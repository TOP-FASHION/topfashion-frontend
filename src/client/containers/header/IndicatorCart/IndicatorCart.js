import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { injectIntl } from 'react-intl'
import { inject, observer } from 'mobx-react'
import Indicator from '../../../components/Indicator'
import Fragment from '../../../components/Fragment'
import Button from '../../../components/Button'
import { setCurrencies } from '../../../translations/currencies.messages'
import './IndicatorCart.scss'

@inject(
  'cartProductsStore',
  'currencyStore',
  'cartRemoveProductStore',
  'cartInfoTotalProductsStore',
  'cartCountProductsStore'
)
@observer
class IndicatorCart extends Component {
  static propTypes = {
    cartProductsStore: PropTypes.object.isRequired,
    currencyStore: PropTypes.object.isRequired,
    cartRemoveProductStore: PropTypes.object.isRequired,
    cartInfoTotalProductsStore: PropTypes.object.isRequired,
    cartCountProductsStore: PropTypes.object.isRequired
  }

  //currencies = setCurrencies(this)

  componentDidMount () {
    this.props.cartProductsStore.getProductCart()
  }

  get totals () {
    const { productsCartInfoTotal } = this.props.cartInfoTotalProductsStore
    const { currency } = this.props.currencyStore

    return productsCartInfoTotal ? (
      <Fragment>
        <tr>
          <th>Subtotal</th>
          <td>
            {this.currencies('value', {
              value: productsCartInfoTotal.subtotal,
              currency: this.currencies(currency)
            })}
          </td>
        </tr>
        <tr>
          <th>Shiping</th>
          <td>
            {/*{this.currencies('value', {*/}
            {/*  value: productsCartInfoTotal.shipping_total,*/}
            {/*  currency: this.currencies(currency)*/}
            {/*})}*/}
          </td>
        </tr>
        <tr>
          <th>Total</th>
          <td>
            {/*{this.currencies('value', {*/}
            {/*  value: productsCartInfoTotal.total,*/}
            {/*  currency: this.currencies(currency)*/}
            {/*})}*/}
          </td>
        </tr>
      </Fragment>
    ) : null
  }

  productCart (product) {
    let options
    let image
    if (product.options) {
      options = (
        <ul className='dropcart__product-options'>
          {product.options.map((option, index) => (
            <li key={index}>{`${option.optionTitle}: ${option.valueTitle}`}</li>
          ))}
        </ul>
      )
    }

    if (product.product_image.length) {
      image = (
        <div className='dropcart__product-image'>
          <Link to={`/category/product/${product.product_id}`}>
            <img src={product.product_image} alt='' />
          </Link>
        </div>
      )
    }

    return (
      <div key={product.product_id} className='dropcart__product'>
        {image}
        <div className='dropcart__product-info'>
          <div className='dropcart__product-name'>
            <Link to={`/category/product/${product.product_id}`}>
              {product.product_name}
            </Link>
          </div>
          {options}
          <div className='dropcart__product-meta'>
            <span className='dropcart__product-quantity'>
              {product.quantity}
            </span>
            {' x '}
            <span className='dropcart__product-price'>
              {product.product_price}
            </span>
          </div>
        </div>
        <Button
          variant='primary'
          onClick={() => this.props.cartRemoveProductStore.removeProductCart(product.key)}
          className={'dropcart__product-remove btn btn-light btn-sm btn-svg-icon'}
        >
          <i className='fas fa-times' />
        </Button>
      </div>
    )
  }

  get dropdown () {
    const { productsCart } = this.props.cartProductsStore
    const { productsCartCountItems } = this.props.cartCountProductsStore

    return productsCartCountItems && productsCart ? (
      <div className='dropcart'>
        <div className='dropcart__products-list'>
          {Object.keys(productsCart).map((key, index) => (
            <Fragment key={index}>
              {this.productCart(productsCart[key], index)}
            </Fragment>
          ))}
        </div>

        <div className='dropcart__totals'>
          <table>
            <tbody>{this.totals}</tbody>
          </table>
        </div>

        <div className='dropcart__buttons'>
          <Link className='btn btn-secondary' to='/cart'>
            View Cart
          </Link>
          <Link className='btn btn-primary' to='/shop/checkout'>
            Checkout
          </Link>
        </div>
      </div>
    ) : (
      <div className='dropcart'>
        <div className='dropcart__empty'>Your shopping cart is empty!</div>
      </div>
    )
  }

  render () {
    const { productsCartCountItems } = this.props.cartCountProductsStore

    return (
      <Indicator
        url='/cart'
        dropdown={this.dropdown}
        value={productsCartCountItems}
        icon={<i className='fas fa-shopping-cart' />}
      />
    )
  }
}

export default injectIntl(IndicatorCart)
