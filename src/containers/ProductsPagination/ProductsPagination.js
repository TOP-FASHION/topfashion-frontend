import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ProductCard from '../ProductCard'

class ProductsList extends Component {
  render () {
    const { products } = this.props

    return products.map(p => {
      console.log('p', p)
      return <ProductCard product={p} key={p.id} />
    })
  }
}

export default ProductsList
