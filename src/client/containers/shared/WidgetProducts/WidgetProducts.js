import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { injectIntl } from 'react-intl'
import { Link } from 'react-router-dom'
// import setMessages from '../../../utils/setMessages'
import { setCurrencies } from '../../../translations/currencies.messages'
import './WidgetProducts.scss'

@inject('currencyStore')
@observer
class WidgetProducts extends Component {
  static propTypes = {
    title: PropTypes.node,
    currencyStore: PropTypes.any.isRequired
  }

  currencies = setCurrencies(this)

  render () {
    const { title } = this.props
    const { currency } = this.props.currencyStore

    let lastProducts = window.localStorage.getItem('lastProducts')
    lastProducts = JSON.parse(lastProducts)

    const productsList = lastProducts.map((product) => {
      let image
      let price

      if (product.images && product.images.length > 0) {
        image = (
          <div className='widget-products__image'>
            <Link to={`/category/product/${product.id}`}><img src={product.images[0].src} alt='' /></Link>
          </div>
        )
      }

      if (product.sale_price) {
        price = (
          <React.Fragment>
            <span className='widget-products__new-price'>
              {this.currencies('value', {
                value: product.price,
                currency: this.currencies(currency)
              })}
            </span>
            {' '}
            <span className='widget-products__old-price'>
              {this.currencies('value', {
                value: product.sale_price,
                currency: this.currencies(currency)
              })}
            </span>
          </React.Fragment>
        )
      } else {
        price = (
          <span className='widget-products__new-price'>
            {this.currencies('value', {
              value: product.price,
              currency: this.currencies(currency)
            })}
          </span>
        )
      }

      return (
        <div key={product.id} className='widget-products__item'>
          {image}
          <div className='widget-products__info'>
            <div className='widget-products__name'>
              <Link to={`/category/product/${product.id}`}>{product.name}</Link>
            </div>
            <div className='widget-products__prices'>
              {price}
            </div>
          </div>
        </div>
      )
    })

    return (
      <div className='widget-products widget'>
        <h4 className='widget__title'>{title}</h4>
        <div className='widget-products__list'>
          {productsList}
        </div>
      </div>
    )
  }
}

export default injectIntl(WidgetProducts)
