import * as React from 'react'
// import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'
import { injectIntl } from 'react-intl'
import { AppContext } from '../../core/Store/context'
import InputNumber from '../../components/InputNumber'
import PageHeader from '../../containers/shared/PageHeader'
import Button from '../../components/Button/Button'
import { setCurrencies } from '../../translations/currencies.messages'
import './CartPage.scss'

const CartPage = observer((props: any) => {
  const {
    cartProductsStore,
    cartCountProductsStore,
    currencyStore,
    cartInfoTotalProductsStore,
    cartRemoveProductStore,
    cartUpdateProductStore
  } = React.useContext(AppContext)
  const { productsCart }: any = cartProductsStore
  const { currency } = currencyStore

  const [quantities, setQuantities]: any = React.useState([])
  const currencies = setCurrencies(props)

  React.useEffect(() => {
    cartProductsStore.getProductCart()
  }, [])

  const getItemQuantity = (item: any) => {
    const quantity = quantities.find((x: any) => x.itemId === item.product_id)
    return quantity ? quantity.value : item.quantity
  }

  const handleChangeQuantity = (item: any, quantity: any) => {
    setQuantities((state: any) => {
      const stateQuantity = state.quantities.find((x:any) => x.itemId === item.product_id)
      if (!stateQuantity) {
        state.quantities.push({ itemId: item.product_id, value: quantity })
      } else {
        stateQuantity.value = quantity
      }
      return {
        quantities: state.quantities
      }
    })
  }

  const cartNeedUpdate = quantities.map((x: any) => {
    Object.keys(productsCart).map((item: any) => {
      if (x.itemId === productsCart[item].product_id) {
        const data = {
          cart_item_key: productsCart[item].key,
          quantity: x.value
        }
        return cartUpdateProductStore.updateProduct(data)
      }
    })
  })

  const renderItems = () => {
    return productsCart ? Object.keys(productsCart).map((item) => {
      let image
      // let options

      if (productsCart[item].product_image.length > 0) {
        image = <Link to={`/category/product/${productsCart[item].product_id}`}><img src={productsCart[item].product_image} alt='' /></Link>
      }

      /*
      if (item.options.length > 0) {
        options = (
          <ul className="cart-table__options">
            {item.options.map((option, index) => (
              <li key={index}>{`${option.optionTitle}: ${option.valueTitle}`}</li>
            ))}
          </ul>
        );
      }
      */

      return (
        <tr key={productsCart[item].product_id} className='cart-table__row'>
          <td className='cart-table__column cart-table__column--image'>
            {image}
          </td>
          <td className='cart-table__column cart-table__column--product'>
            <Link to={`/category/product/${productsCart[item].product_id}`} className='cart-table__product-name'>
              {productsCart[item].product_name}
            </Link>
            {/*  {options} */}
          </td>
          <td className='cart-table__column cart-table__column--price' data-title='Price'>
            {productsCart[item].product_price}
          </td>
          <td className='cart-table__column cart-table__column--quantity' data-title='Quantity'>
            <InputNumber
              onChange={(quantity) => handleChangeQuantity(productsCart[item], quantity)}
              value={getItemQuantity(productsCart[item])}
              min={1}
            />
          </td>
          <td className='cart-table__column cart-table__column--total' data-title='Total'>
            {currencies('value', {
              value: productsCart[item].line_total,
              currency: currencies(currency)
            })}
          </td>
          <td className='cart-table__column cart-table__column--remove'>
            <Button
              variant='primary'
              onClick={() => cartRemoveProductStore.removeProductCart(productsCart[item].key)}
              className={'btn btn-light btn-sm btn-svg-icon'}
            >
              <i className='fas fa-times' />
            </Button>
          </td>
        </tr>
      )
    }) : null
  }

  const renderTotals = () => {
    const { productsCartInfoTotal } = cartInfoTotalProductsStore

    /* if (cart.extraLines.length <= 0) {
      return null;
    } */

    /* const extraLines = cart.extraLines.map((extraLine, index) => {
      let calcShippingLink;

      if (extraLine.type === 'shipping') {
        calcShippingLink = <div className="cart__calc-shipping"><Link to="/">Calculate Shipping</Link></div>;
      }

      return (
        <tr key={index}>
          <th>{extraLine.title}</th>
          <td>
            <Currency value={extraLine.price} />
            {calcShippingLink}
          </td>
        </tr>
      );
    }); */

    return productsCartInfoTotal ? (
      <React.Fragment>
        <thead className='cart__totals-header'>
          <tr>
            <th>Subtotal</th>
            <td>
              {currencies('value', {
                value: productsCartInfoTotal.subtotal,
                currency: currencies(currency)
              })}
            </td>
          </tr>
        </thead>
        <tbody className='cart__totals-body'>
          {/* {extraLines} */}
        </tbody>
      </React.Fragment>
    ) : null
  }

  const renderCart = () => {
    const { productsCartInfoTotal } = cartInfoTotalProductsStore

    return productsCartInfoTotal ? (
      <div className='cart block'>
        <div className='container'>
          <table className='cart__table cart-table'>
            <thead className='cart-table__head'>
              <tr className='cart-table__row'>
                <th className='cart-table__column cart-table__column--image'>Image</th>
                <th className='cart-table__column cart-table__column--product'>Product</th>
                <th className='cart-table__column cart-table__column--price'>Price</th>
                <th className='cart-table__column cart-table__column--quantity'>Quantity</th>
                <th className='cart-table__column cart-table__column--total'>Total</th>
                <th className='cart-table__column cart-table__column--remove' aria-label='Remove' />
              </tr>
            </thead>
            <tbody className='cart-table__body'>
              {renderItems()}
            </tbody>
          </table>
          <div className='cart__actions'>
            <form className='cart__coupon-form'>
              <label htmlFor='input-coupon-code' className='sr-only'>Password</label>
              <input type='text' className='form-control' id='input-coupon-code' placeholder='Coupon Code' />
              <button type='submit' className='btn btn-primary'>Apply Coupon</button>
            </form>
            <div className='cart__buttons'>
              <Link to='/' className='btn btn-light'>Continue Shopping</Link>
              <button
                onClick={() => cartNeedUpdate()}
                className={'btn btn-primary cart__update-button'}
              >
                Update Cart
              </button>
            </div>
          </div>

          <div className='row justify-content-end pt-md-5 pt-4'>
            <div className='col-12 col-md-7 col-lg-6 col-xl-5'>
              <div className='card'>
                <div className='card-body'>
                  <h3 className='card-title'>Cart Totals</h3>
                  <table className='cart__totals'>
                    {renderTotals()}
                    <tfoot className='cart__totals-footer'>
                      <tr>
                        <th>Total</th>
                        <td>
                          {currencies('value', {
                            value: productsCartInfoTotal.total,
                            currency: currencies(currency)
                          })}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                  <Link to='/shop/checkout' className='btn btn-primary btn-xl btn-block cart__checkout-button'>
                    Proceed to checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : null
  }

  const { productsCartCountItems } = cartCountProductsStore
  const breadcrumb = [
    { title: 'Home', url: '' },
    { title: 'Shopping Cart', url: '' }
  ]

  let content

  if (productsCartCountItems) {
    content = renderCart()
  } else {
    content = (
      <div className='block block-empty'>
        <div className='container'>
          <div className='block-empty__body'>
            <div className='block-empty__message'>Your shopping cart is empty!</div>
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
      <PageHeader header='Shopping Cart' breadcrumb={breadcrumb} />
      {content}
    </React.Fragment>
  )
})

export default injectIntl(CartPage)
