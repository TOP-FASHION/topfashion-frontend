import React, { Component } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

@inject('brandsStore', 'productsStore')
@observer
class FilterCheckbox extends Component {
  componentDidMount () {
    this.props.brandsStore.getBrands()
  }

  get itemsList () {
    const { brands } = this.props.brandsStore

    return brands ? brands.map((item) => {
      let count

      if (item.count) {
        count = <span className='filter-list__counter'>{item.count}</span>
      }

      return (
        <label
          key={item.term_id}
          className={classNames('filter-list__item', {
            'filter-list__item--disabled': item.disabled
          })}
        >
          <span className='filter-list__input input-check'>
            <span className='input-check__body'>
              <input className='input-check__input' type='checkbox' />
              <span className='input-check__box' />
              <i className='input-check__icon fas fa-check ' />
            </span>
          </span>
          <span className='filter-list__title'>{item.name}</span>
          {count}
        </label>
      )
    }) : null
  }

  render () {
    return (
      <div className='filter-list'>
        <div className='filter-list__list'>
          {this.itemsList}
        </div>
      </div>
    )
  }
}

FilterCheckbox.propTypes = {
  items: PropTypes.array
}

export default FilterCheckbox
