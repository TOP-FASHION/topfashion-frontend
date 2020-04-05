import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import InputRange from 'react-input-range'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { setCurrencies } from '../../../translations/currencies.messages'
import './FilterPrice.scss'

@inject('currencyStore', 'productsStore', 'productsCategoriesStore')
@observer
class FilterPrice extends Component {
  static propTypes = {
    currencyStore: PropTypes.any,
    productsStore: PropTypes.any,
    productsCategoriesStore: PropTypes.any,
    from: PropTypes.number,
    to: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number
  }

  static defaultProps = {
    from: undefined,
    to: undefined,
    min: 0,
    max: 100,
    step: 1
  }

  currencies = setCurrencies(this)

  constructor (props) {
    super(props)

    this.state = {}
  }

  handleChange = (value) => {
    const { direction } = 'en'
    let { min: from, max: to } = value

    // since react-input-range does not support RTL direction,
    // we just need to invert and swipe values
    if (direction === 'rtl') {
      [from, to] = [to * -1, from * -1]
    }

    this.setState(() => ({ from, to }))
  };

  submit = (from, to) => {
    this.props.productsStore.getProducts({
      per_page: this.props.productsStore.countProducts,
      'filter[limit]': this.props.productsStore.countProducts,
      order: 'desc',
      category: this.props.productsCategoriesStore.categoryId,
      min_price: from,
      max_price: to
    })
  };

  render () {
    const { from: stateFrom, to: stateTo } = this.state
    const {
      step,
      from: propsFrom,
      to: propsTo
    } = this.props
    const { currency } = this.props.currencyStore
    let { min, max } = this.props
    const { direction } = 'en'

    let from = Math.max(stateFrom || propsFrom || min, min)
    let to = Math.min(stateTo || propsTo || max, max)
    let fromLabel = from
    let toLabel = to

    // since react-input-range does not support RTL direction,
    // we just need to invert and swipe values
    if (direction === 'rtl') {
      [from, to] = [to * -1, from * -1];
      [min, max] = [max * -1, min * -1];
      [fromLabel, toLabel] = [from * -1, to * -1]
    }

    return (
      <div className='filter-price'>
        <div className='filter-price__slider' dir='ltr'>
          <InputRange
            minValue={min}
            maxValue={max}
            value={{ min: from, max: to }}
            step={step}
            onChange={this.handleChange}
            onChangeComplete={() => this.submit(fromLabel, toLabel)}
          />
        </div>
        <div className='filter-price__title'>
          Price:
          {' '}
          <span className='filter-price__min-value'>{this.currencies(currency)} {fromLabel}</span>
          {' – '}
          <span className='filter-price__max-value'>{this.currencies(currency)} {toLabel}</span>
        </div>
      </div>
    )
  }
}

export default injectIntl(FilterPrice)
