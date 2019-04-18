import React, {Component} from 'react'
import Product from '../Product'
import PropTypes from "prop-types"

class ProductList extends Component {
  static propTypes = {
    products: PropTypes.array.isRequired,
    category: PropTypes.string
  }

  render() {
    const { products, category } = this.props

    return products.map(p => {
      return <Product product={p} key={p.id} />
    })
  }
}

export default ProductList