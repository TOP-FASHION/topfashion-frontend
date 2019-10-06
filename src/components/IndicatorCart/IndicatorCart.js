import React, { Component } from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import Indicator from '../../components/Indicator'
import { inject, observer } from 'mobx-react'
import './IndicatorCart.scss'
import Fragment from '../Fragment'
import Button from '../../components/Button'

@inject(
  'productsCartStore',
  'currencyStore',
  'productCartAddStore',
  'productCartRemoveStore',
  'productsStore',
  'productsCartInfoTotalStore',
  'productsCartCountItemsStore'
)
@observer
class IndicatorCart extends Component {
  componentDidMount () {
    this.props.productsCartStore.getProductCart()
  }

  get totals () {
    const { productsCartInfoTotal } = this.props.productsCartInfoTotalStore
    const { currency } = this.props.currencyStore

    return productsCartInfoTotal ? (
      <Fragment>
        <tr>
          <th>Subtotal</th>
          <td>
            {productsCartInfoTotal.subtotal} {currency}
          </td>
        </tr>
        <tr>
          <th>Shiping</th>
          <td>
            {productsCartInfoTotal.shipping_total} {currency}
          </td>
        </tr>
        <tr>
          <th>Total</th>
          <td>
            {productsCartInfoTotal.total} {currency}
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
          <Link to={`/shop/product/${product.product_id}`}>
            <img src={product.product_image} alt='' />
          </Link>
        </div>
      )
    }

    return (
      <Fragment key={product.product_id}>
        <div className='dropcart__product'>
          {image}
          <div className='dropcart__product-info'>
            <div className='dropcart__product-name'>
              <Link to={`/shop/product/${product.product_id}`}>
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
            onClick={() =>
              this.props.productCartRemoveStore.removeProductCart(product.key)
            }
            className={
              'dropcart__product-remove btn btn-light btn-sm btn-svg-icon'
            }
          >
            <i className='fas fa-times' />
          </Button>
        </div>
      </Fragment>
    )
  }

  get dropdown () {
    const { productsCart } = this.props.productsCartStore
    const { productsCartCountItems } = this.props.productsCartCountItemsStore

    return productsCartCountItems ? (
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
          <Link className='btn btn-secondary' to='/shop/cart'>
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
    const { productsCartCountItems } = this.props.productsCartCountItemsStore

    return (
      <Indicator
        url='/shop/cart'
        dropdown={this.dropdown}
        value={productsCartCountItems}
        icon={<i className='fas fa-shopping-cart' />}
      />
    )
  }
}

export default IndicatorCart
