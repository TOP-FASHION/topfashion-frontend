import * as React from 'react'
import { Link } from 'react-router-dom'
// @ts-ignore
import { injectIntl } from 'react-intl'
import { observer } from 'mobx-react'
import { AppContext } from '../../../core/Store/context'
import Indicator from '../../../components/Indicator'
import Fragment from '../../../components/Fragment'
import Button from '../../../components/Button'
import { setCurrencies } from '../../../translations/currencies.messages'
import './IndicatorCart.scss'

const IndicatorCart = observer((props: any) => {
  const {
    cartProductsStore,
    currencyStore,
    cartRemoveProductStore,
    cartInfoTotalProductsStore,
    cartCountProductsStore
  } = React.useContext(AppContext)
  const currencies = setCurrencies(props)

  const { productsCartInfoTotal } = cartInfoTotalProductsStore
  const { currency } = currencyStore
  const { productsCart }: any = cartProductsStore
  const { productsCartCountItems } = cartCountProductsStore

  React.useEffect(() => {
    cartProductsStore.getProductCart()
  }, [])

  const totals = productsCartInfoTotal ? (
    <Fragment>
      <tr>
        <th>Subtotal</th>
        <td>
          {currencies('value', {
            value: productsCartInfoTotal.subtotal,
            currency: currencies(currency)
          })}
        </td>
      </tr>
      <tr>
        <th>Shiping</th>
        <td>
          {currencies('value', {
            value: productsCartInfoTotal.shipping_total,
            currency: currencies(currency)
          })}
        </td>
      </tr>
      <tr>
        <th>Total</th>
        <td>
          {currencies('value', {
            value: productsCartInfoTotal.total,
            currency: currencies(currency)
          })}
        </td>
      </tr>
    </Fragment>
  ) : null

  const productCart = (product: any, index: number) => {
    let options
    let image
    if (product.options) {
      options = (
        <ul className='dropcart__product-options'>
          {product.options.map((option: any, index: any) => (
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
          onClick={() => cartRemoveProductStore.removeProductCart(product.key)}
          className={'dropcart__product-remove btn btn-light btn-sm btn-svg-icon'}
        >
          <i className='fas fa-times' />
        </Button>
      </div>
    )
  }

  const dropdown = productsCartCountItems && productsCart ? (
    <div className='dropcart'>
      <div className='dropcart__products-list'>
        {Object.keys(productsCart).map((key, index) => (
          <Fragment key={index}>
            {productCart(productsCart[key], index)}
          </Fragment>
        ))}
      </div>

      <div className='dropcart__totals'>
        <table>
          <tbody>{totals}</tbody>
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

  return (
    <Indicator
      url='/cart'
      dropdown={dropdown}
      value={productsCartCountItems}
      icon={<i className='fas fa-shopping-cart' />}
    />
  )
})

export default injectIntl(IndicatorCart)
