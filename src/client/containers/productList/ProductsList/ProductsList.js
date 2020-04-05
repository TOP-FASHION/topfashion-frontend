import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ProductCard from '../../product/ProductCard'

class ProductsList extends Component {
  static propTypes = {
    products: PropTypes.array
  }

  render () {
    const { products } = this.props
    return products.map(product => (
      <div className='products-list__item' key={product.id}>
        <ProductCard product={product} />
      </div>
    ))
  }
}

export default ProductsList
