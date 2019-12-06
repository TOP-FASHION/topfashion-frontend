import React, { Component } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import './ProductsBlockHeader.scss'

class ProductsBlockHeader extends Component {
  static propTypes = {
    title: PropTypes.string,
    arrows: PropTypes.bool,
    groups: PropTypes.array,
    onNext: PropTypes.func,
    onPrev: PropTypes.func,
    onGroupClick: PropTypes.func
  }

  static defaultProps = {
    groups: [],
    onGroupClick: () => {}
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
    let groupsList

    if (this.props.groups.length > 0) {
      groupsList = this.props.groups.map((group, index) => {
        const classes = classNames('block-header__group', {
          'block-header__group--active': group.current
        })

        return (
          <li key={index}>
            <button type='button' className={classes} onClick={() => this.props.onGroupClick(group)}>
              {group.name}
            </button>
          </li>
        )
      })
    }

    return this.props.groups.length > 0 ? (
      <ul className='block-header__groups-list'>
        {groupsList}
      </ul>
    ) : null
  }

  render () {
    const { title } = this.props

    return (
      <div className='block-header'>
        <h3 className='block-header__title'>{title}</h3>
        <div className='block-header__divider' />
        {this.groupsList}
        {this.arrows}
      </div>
    )
  }
}

export default injectIntl(ProductsBlockHeader)
