import React, {Component} from 'react'
import Product from '../Product'
import PropTypes from "prop-types"

class ProductList extends Component {

  render() {
    const { products } = this.props

    return products.map(p => {
      return <Product product={p} key={p.id} />
    })
  }
}

export default ProductList