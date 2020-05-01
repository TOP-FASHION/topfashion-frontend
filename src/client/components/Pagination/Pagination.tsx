import * as React from 'react';
import classNames from 'classnames';
import './Pagination.scss';

interface Props {
  siblings?: number;
  current?: number;
  total?: number;
  onPageChange?: Function;
}

Pagination.defaultProps = {
  siblings: 1,
  current: 1,
  total: 1,
};

function Pagination(props: Props) {
  const setPage = (value: number) => {
    const { total, current, onPageChange } = props;

    if (value < 1 || value > total || value === current) {
      return;
    }

    if (onPageChange) {
      onPageChange(value);
    }
  };

  const getPages = () => {
    const { siblings, current, total } = props;
    const pages = [];
    const min = Math.max(
      1,
      current - siblings - Math.max(0, siblings - total + current)
    );
    const max = Math.min(total, min + siblings * 2);

    for (let i = min; i <= max; i += 1) {
      pages.push(i);
    }

    return pages;
  };

  const { current, total } = props;
  const firstLinkClasses = classNames('page-item', {
    disabled: current <= 1,
  });
  const lastLinkClasses = classNames('page-item', {
    disabled: current >= total,
  });

  const pages = getPages().map((page, index) => {
    const classes = classNames('page-item', {
      active: page === current,
    });

    return (
      <li key={index} className={classes}>
        <button
          type="button"
          className="page-link"
          onClick={() => setPage(page)}
        >
          {page}
          {page === current && <span className="sr-only">(current)</span>}
        </button>
      </li>
    );
  });

  return (
    <ul className="pagination justify-content-center">
      <li className={firstLinkClasses}>
        <button
          type="button"
          className="page-link page-link--with-arrow"
          aria-label="Previous"
          onClick={() => setPage(current - 1)}
        >
          <i className="fas fa-angle-left page-link__arrow page-link__arrow--left" />
        </button>
      </li>
      {pages}
      <li className={lastLinkClasses}>
        <button
          type="button"
          className="page-link page-link--with-arrow"
          aria-label="Next"
          onClick={() => setPage(current + 1)}
        >
          <i className="fas fa-angle-right page-link__arrow page-link__arrow--right" />
        </button>
      </li>
    </ul>
  );
}

export default Pagination;
