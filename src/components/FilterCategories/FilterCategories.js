import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function FilterCategories(props) {
  const { categories } = props;

  const categoriesList = categories.map((category) => {
    let arrow;

    if (category.type === 'parent') {
      arrow = '';
    }

    return (
      <li key={category.id} className={`filter-categories__item filter-categories__item--${category.type}`}>
        {arrow}
        <Link to="/">{category.name}</Link>
        <div className="filter-categories__counter">{category.count}</div>
      </li>
    );
  });

  return (
    <div className="filter-categories">
      <ul className="filter-categories__list">
        {categoriesList}
      </ul>
    </div>
  );
}

FilterCategories.propTypes = {
  categories: PropTypes.array,
};

export default FilterCategories;
