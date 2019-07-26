import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import ProductList from '../ProductList'
import './Shelf.scss'

@inject('productsStore')
@observer
class Shelf extends Component {
  componentDidMount() {
    this.props.productsStore.getProducts()
  }

  render() {
    const { products } = this.props.productsStore

    return products ? (
      <React.Fragment>
        <div className="shelf-container">
          <ProductList products={products} />
        </div>
      </React.Fragment>
    ) : null
  }
}

export default Shelf
