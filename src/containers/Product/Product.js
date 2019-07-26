import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '../../components/Button'
import Thumb from '../../components/Thumb/index'

class Product extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
    replace: PropTypes.bool
  }

  render () {
    const { product } = this.props
    const category = product.categories[0].slug

    return (
      <div className='shelf-item' data-sku={product.sku}>
        <Thumb
          classes='shelf-item__thumb'
          src={product.images[0].src}
          alt={product.name}
        />
        <p className='shelf-item__title'>{product.name}</p>
        <div className='shelf-item__price'>
          <div className='val'>
            <small>{product.price}</small>
          </div>
        </div>
      </div>
    )
  }
}

export default Product
