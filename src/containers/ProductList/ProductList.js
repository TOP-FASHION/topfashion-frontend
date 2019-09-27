import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Product from '../Product'

class ProductList extends Component {
  render () {
    const { products } = this.props

    return products.map(p => {
      console.log('product', p)
      return <Product product={p} key={p.id} />
    })
  }
}

export default ProductList
