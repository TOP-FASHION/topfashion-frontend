import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Sort from '../Sort/index'

class ShelfHeader extends Component {
  static propTypes = {
    productsLength: PropTypes.number.isRequired
  }

  render () {
    const { productsLength } = this.props

    return (
      <div className='shelf-container-header'>
        <small className='products-found'>
          <span>{productsLength} Product(s) found.</span>
        </small>
        <Sort />
      </div>
    )
  }
}

export default ShelfHeader
