import * as React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { GET_CATEGORIES } from '../../../queries/categories'
import Collapse from '../../../components/Collapse/index'
import './WidgetCategories.scss'

type MyType = {
  id: number;
  name: string;
  slug: string;
  count: string;
  children: {
    nodes: [
      {
        id: number;
        name: string;
        slug: string;
        count: string;
      }
    ]
  }
}

type IFilterCategoryProp = {
  nodes: Array<MyType>;
}

interface IFilterCategoriesProps {
  productCategories: IFilterCategoryProp;
  match: string;
}

type TParams = RouteComponentProps<any>

const WidgetCategories = ({ match }: TParams) => {
  const { loading, data, error } = useQuery<IFilterCategoriesProps>(GET_CATEGORIES)

  if (loading) return null
  if (!data) return null
  if (error) return null

  const categoriesList = data.productCategories.nodes.map((category) => {
    const renderCategory = ({ toggle, setItemRef, setContentRef }) => {
      let expander
      let children

      if (category.children) {
        expander = <button className='widget-categories__expander' type='button' aria-label='Expand' onClick={toggle} />

        children = (
          <div className='widget-categories__subs' ref={setContentRef}>
            <ul>
              {category.children.nodes.map((sub) => (
                <li key={sub.id}><Link to={`/category/${sub.slug}`}>{sub.name}</Link></li>
              ))}
            </ul>
          </div>
        )
      }

      return (
        <li className='widget-categories__item' ref={setItemRef}>
          <div className='widget-categories__row'>
            <Link to={'/'}>
              <i className='fas fa-angle-right widget-categories__arrow' />
              {category.name}
            </Link>
            {expander}
          </div>
          {children}
        </li>
      )
    }

    return <Collapse key={category.id} toggleClass='widget-categories__item--open' render={renderCategory} />
  })

  return (
    <div className={`widget-categories widget-categories--location-- widget`}>
      <h4 className='widget__title'>Categories</h4>
      <ul className='widget-categories__list'>
        {categoriesList}
      </ul>
    </div>
  )
}

export default WidgetCategories
