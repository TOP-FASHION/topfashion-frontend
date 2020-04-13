import * as React from 'react'
import { injectIntl } from 'react-intl'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../../core/Store/context'
import Fragment from '../../../components/Fragment'
import InputNumber from '../../../components/InputNumber'
import ProductGallery from '../ProductGallery'
import Rating from '../../../components/Rating'
import Button from '../../../components/Button'
// import messages from './Product.messages'
import { setCurrencies } from '../../../translations/currencies.messages'
import './Product.scss'

interface Props {
  product: any,
  layout: 'standard' | 'sidebar' | 'columnar' | 'quickview'
}

const Product = observer(({ layout = 'standard', product, ...otherProps }: Props) => {
  const { currencyStore, cartAddProductStore } = React.useContext(AppContext)
  const currencies = setCurrencies(otherProps)
  const [quantity, setQuantity] = React.useState(1)

  const handleChangeQuantity = (quantity: any) => {
    setQuantity(quantity)
  }

  const images = () => {
    const images: any = []
    product.images.map((item: any) => images.push(item.src))
    return images
  }

  let prices

  if (product.sale_price) {
    prices = (
      <React.Fragment>
        <span className='product__new-price'>
          {currencies('value', {
            value: product.regular_price,
            currency: currencies(currencyStore.currency)
          })}
        </span>{' '}
        <span className='product__old-price'>
          {currencies('value', {
            value: product.sale_price,
            currency: currencies(currencyStore.currency)
          })}
        </span>
      </React.Fragment>
    )
  } else {
    prices = currencies('value', {
      value: product.price,
      currency: currencies(currencyStore.currency)
    })
  }

  const brands = product.brands ? product.brands.map((item: any, index: any) => {
    return (
      <Link key={index} to='/'>{item.name}</Link>
    )
  }) : null

  const attributeSize = () => {
    let attributeSize = []
    product.attributes.map((item: any, index: any) => {
      if (item.name === 'Size') {
        attributeSize = item.options
      }
    })

    const options = ['40', '41', '42', '43', '44'].map((size, index) => {
      return (
        <label key={index}>
          <input type='radio' name='material' />
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

  const attributeColor = () => {
    const attributeColor: any = []
    product.attributes.map((item: any) => {
      if (item.name === 'Color') {
        item.options.map((item: any, index: any) => {
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

  const categories = () => {
    const categories = product.categories

    const tags = categories ? categories.map((item: any, index: any) => {
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

  return (
    <div className={`product product--layout--${layout}`}>
      <div className='product__content'>
        <ProductGallery layout={layout} images={images()} />

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
              Brand: {brands}
            </li>
            <li>SKU: {product.sku}</li>
          </ul>
        </div>

        <div className='product__sidebar'>
          <div className='product__prices'>{prices}</div>

          <form className='product__options'>
            <div className='form-group product__option'>
              {attributeColor()}
            </div>
            <div className='form-group product__option'>
              {attributeSize()}
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
                    aria-label='Quantity'
                    className='product__quantity'
                    size='lg'
                    min={1}
                    value={quantity}
                    onChange={handleChangeQuantity}
                  />
                </div>
                <div className='product__actions-item product__actions-item--addtocart'>
                  <Button
                    variant='primary'
                    onClick={() => cartAddProductStore.addProduct(product.id, quantity)}
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
          {categories()}

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
})

export default injectIntl(Product)
