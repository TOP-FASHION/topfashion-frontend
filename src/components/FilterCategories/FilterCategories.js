import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react/'

@inject('productsCategoriesStore', 'productsStore')
@observer
class FilterCategories extends Component {
  static propTypes = {
    productsCategoriesStore: PropTypes.object.isRequired,
    productsStore: PropTypes.object.isRequired,
    categories: PropTypes.array
  };

  componentDidMount () {
    this.props.productsCategoriesStore.getCategories({})
  }

  submit = (category) => {
    this.props.productsStore.getProducts({
      page: 1,
      per_page: this.props.productsStore.countProducts,
      'filter[limit]': this.props.productsStore.countProducts,
      category: category.id
    })
  }

  render () {
    const { categories } = this.props.productsCategoriesStore

    return categories ? (
      <div className='filter-categories'>
        <ul className='filter-categories__list'>
          {categories.map((category) => {
            let arrow

            if (category.type === 'parent') {
              arrow = ''
            }

            return category.parent !== 0 ? (
              <li key={category.id} className={`filter-categories__item filter-categories__item--${category.type}`}>
                {arrow}
                <Link to={`/category/${category.slug}`} onClick={() => this.submit(category)}>{category.name}</Link>
                <div className='filter-categories__counter'>{category.count}</div>
              </li>
            ) : null
          })}
        </ul>
      </div>
    ) : null
  }
}

export default FilterCategories
