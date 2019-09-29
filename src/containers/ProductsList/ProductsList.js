import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ProductCard from '../ProductCard'

class ProductsList extends Component {
  render () {
    const { products } = this.props

    return products.map(product => {
      <div key={product.id} className="products-list__item">
        <ProductCard product={product} />
      </div>
    })
  }
}

export default ProductsList
