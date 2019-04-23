import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ProductList from '../ProductList'
import { inject, observer } from 'mobx-react'

import './Shelf.scss'

@inject('products')
@observer
class Shelf extends Component {
  componentDidMount() {
    this.props.products.getProducts('category')
  }

  render() {
    const {
      products: { products }
    } = this.props.products;

    return products ?(
      <React.Fragment>
        <div className="shelf-container">
          <ProductList products={products} />
        </div>
      </React.Fragment>
    ) : null
  }
}

export default Shelf
