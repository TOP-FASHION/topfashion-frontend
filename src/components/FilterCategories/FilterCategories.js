import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react/'

@inject('productsCategoriesStore', 'productsStore')
@observer
class FilterCategories extends Component {
  static propTypes = {
    productsCategoriesStore: PropTypes.object.isRequired,
    categories: PropTypes.array
  };

  componentDidMount () {
    this.props.productsCategoriesStore.getCategories({})
  }

  render () {
    const { categories } = this.props.productsCategoriesStore

    return categories ? (
      <div className='filter-categories'>
        <ul className='filter-categories__list'>
          {categories.map((category) => {
            let arrow

            if (category.parent === 0) {
              arrow = '----'
            }

            return (
              <li key={category.id} className={`filter-categories__item filter-categories__item--${category.type}`}>
                {arrow}
                <Link to={`/category/${category.slug}`}>{category.name}</Link>
                <div className='filter-categories__counter'>{category.count}</div>
              </li>
            )
          })}
        </ul>
      </div>
    ) : null
  }
}

export default FilterCategories
