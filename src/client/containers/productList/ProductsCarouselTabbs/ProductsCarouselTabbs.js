import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { injectIntl } from 'react-intl'
import ProductsCarousel from '../ProductsCarousel'

@inject('productsStore')
@observer
class ProductsCarouselTabbs extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    layout: PropTypes.oneOf(['grid-4', 'grid-4-sm', 'grid-5', 'horizontal']),
    rows: PropTypes.number,
    withSidebar: PropTypes.bool,
    products: PropTypes.array
  };

  static defaultProps = {
    layout: 'grid-4',
    rows: 1,
    withSidebar: false
  };

  constructor (props) {
    super(props)

    this.state = {
      loading: false
    }
  }

  render () {
    return this.props.products ? (
      <ProductsCarousel
        {...this.props}
        {...this.state}
        products={this.props.products}
      />
    ) : null
  }
}

export default injectIntl(ProductsCarouselTabbs)
