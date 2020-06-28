import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { withRouter } from 'react-router';
import { useQuery } from '@apollo/react-hooks';
import classNames from 'classnames';
import { GET_CATEGORIES } from '../../../queries/categories';
import './FilterCategories.scss';

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
    ];
  };
};

type IFilterCategoryProp = {
  nodes: Array<MyType>;
};

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface FilterCategoriesProps {
  productCategories: IFilterCategoryProp;
  match: string;
}

type TParams = RouteComponentProps<any>;

const FilterCategories = ({ match }: TParams) => {
  const { loading, data, error } = useQuery<FilterCategoriesProps>(
    GET_CATEGORIES
  );

  if (loading) return null;
  if (!data) return null;
  if (error) return null;

  const classes = (slug: any, count: any) =>
    classNames('filter-categories__item', {
      'filter-categories__item--current': match.params.categoryId === slug,
      'd-none': count === null,
    });

  return (
    <div className="filter-categories">
      <ul className="filter-categories__list">
        {data.productCategories.nodes.map((category) => {
          return (
            <li
              key={category.id}
              className={`${classes(
                category.slug,
                ''
              )} filter-categories__item--parent`}
            >
              <i className="fas fa-angle-left filter-categories__arrow" />
              <Link to={`/category/${category.slug}`}>{category.name}</Link>
              <div className="filter-categories__counter">{category.count}</div>
              {category.children.nodes.map((childCategory) => {
                return (
                  <div
                    key={childCategory.id}
                    className="filter-categories__item--wrapper"
                  >
                    <div
                      className={`${classes(
                        childCategory.slug,
                        childCategory.count
                      )} filter-categories__item--child`}
                    >
                      <Link to={`/category/${childCategory.slug}`}>
                        {childCategory.name}
                      </Link>
                      <div className="filter-categories__counter">
                        {childCategory.count}
                      </div>
                    </div>
                  </div>
                );
              })}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default withRouter(FilterCategories);
