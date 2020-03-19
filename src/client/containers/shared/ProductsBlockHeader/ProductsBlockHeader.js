import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { Link } from 'react-router-dom'
import './ProductsBlockHeader.scss'

class ProductsBlockHeader extends Component {
  static propTypes = {
    title: PropTypes.string,
    arrows: PropTypes.bool,
    group: PropTypes.string,
    allProducts: PropTypes.bool,
    onNext: PropTypes.func,
    onPrev: PropTypes.func
  }

  get arrows () {
    return this.props.arrows ? (
      <div className='block-header__arrows-list'>
        <button className='block-header__arrow block-header__arrow--left' type='button' onClick={this.props.onPrev}>
          <i className='fas fa-chevron-left' />
        </button>
        <button className='block-header__arrow block-header__arrow--right' type='button' onClick={this.props.onNext}>
          <i className='fas fa-chevron-right' />
        </button>
      </div>
    ) : null
  }

  get groupsList () {
    return this.props.allProducts ? (
      <ul className='block-header__groups-list'>
        <li>
          <Link className='block-header__group' to={`/category/${this.props.group}`}>All products</Link>
        </li>
      </ul>
    ) : null
  }

  render () {
    return (
      <div className='block-header'>
        <h3 className='block-header__title'>{this.props.title}</h3>
        <div className='block-header__divider' />
        {this.groupsList}
        {this.arrows}
      </div>
    )
  }
}

export default injectIntl(ProductsBlockHeader)
