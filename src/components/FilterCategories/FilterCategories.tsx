import * as React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { GET_CATEGORIES } from '../../queries/categories'

interface IFilterCategoryProp {
  nodes: Array<any>;
}

interface IFilterCategoriesProps {
  productCategories: IFilterCategoryProp
}

const FilterCategories = () => {
  const { loading, data, error } = useQuery<IFilterCategoriesProps>(GET_CATEGORIES);

  if (loading) return null
  if (!data) return null

  return (
    <div className='filter-categories'>
      <ul className='filter-categories__list'>
        {data.productCategories.nodes.map((category) => {
          let arrow: {}

          if (category.parent === 0) {
            arrow = '--+--'
          }

          return (
            <li key={category.id} className={`filter-categories__item filter-categories__item--parent`}>
              {arrow}
              <Link to={`/category/${category.slug}`}>{category.name}</Link>
              <div className='filter-categories__counter'>{category.count}</div>
              {
                category ? (category.children.nodes.map((childCategory) => {
                  return (
                    <div key={childCategory.id} className={`filter-categories__item--wrapper`}>
                      <div className={`filter-categories__item filter-categories__item--child`}>
                        {arrow}
                        <Link to={`/category/${childCategory.slug}`}>{childCategory.name}</Link>
                        <div className='filter-categories__counter'>{childCategory.count}</div>
                      </div>
                    </div>
                  )
                })) : null
              }
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default FilterCategories
