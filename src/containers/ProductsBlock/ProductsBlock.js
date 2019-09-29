import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import ProductsBlockHeader from '../ProductsBlockHeader'
import ProductCard from '../ProductCard'
import {injectIntl} from "react-intl"
import './ProductsBlock.scss'

@inject('productsStore')
@observer
class ProductsBlock extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    layout: PropTypes.oneOf(['large-first', 'large-last']),
  }
  static defaultProps = {
    layout: 'large-first',
  }
  componentDidMount () {
    this.props.productsStore.getProducts()
  }

  get featuredProduct () {
    const { products } = this.props.productsStore

    return products ? (
      <div className="block-products__featured">
        <div className="block-products__featured-item">
          <ProductCard product={products[0]} />
        </div>
      </div>
    ) : null
  }

  get productsList () {
    const { products } = this.props.productsStore
    return products && products.length > 0 ? (
      <div className="block-products__list">
        {products.slice(0, 6).map((product, index) => (
          <div key={index} className="block-products__list-item">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    ) : null
  }

  render () {
    const { title, layout } = this.props;

    return (
      <div className={`block block-products block-products--layout--${layout}`}>
        <div className="container">
          <ProductsBlockHeader title={title} />
          <div className="block-products__body">
            {layout === 'large-first' && this.featuredProduct}
            {this.productsList}
            {layout === 'large-last' && this.featuredProduct}
          </div>
        </div>
      </div>
    )
  }
}

export default injectIntl(ProductsBlock)
