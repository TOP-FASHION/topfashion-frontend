import React, {Component} from 'react'
import PropTypes from 'prop-types'

import Thumb from '../../components/Thumb/index'

class Product extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired
  }

  render() {
    const { product } = this.props

    return (
      <div
        className="shelf-item"
        onClick={() => addProduct(product)}
        data-sku={product.sku}
      >
        <Thumb
          classes="shelf-item__thumb"
          src={(`https://localhost:8443/api/images/products/${product.id}/${product.associations.images[0].id}`)}
          alt={product.title}
        />
        <p className="shelf-item__title">{product.title}</p>
        <div className="shelf-item__price">
          <div className="val">
            <small>{product.currencyFormat}</small>
          </div>
        </div>
        <div className="shelf-item__buy-btn">Add to cart</div>
      </div>
    )
  }
}

export default Product
