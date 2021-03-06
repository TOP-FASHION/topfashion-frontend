import * as React from 'react';
import classNames from 'classnames';

interface Props {
  items?: Array<any>;
  name?: string;
}

function FilterRadio({ items, name }: Props) {
  const itemsList = items.map((item) => {
    let count;

    if (item.count) {
      count = <span className="filter-list__counter">{item.count}</span>;
    }

    return (
      <label
        key={item.id}
        htmlFor={item.id}
        className={classNames('filter-list__item', {
          'filter-list__item--disabled': item.disabled,
        })}
      >
        <span className="filter-list__input input-radio">
          <span className="input-radio__body">
            <input
              id={item.id}
              className="input-radio__input"
              type="radio"
              name={name}
              defaultChecked={item.checked}
              disabled={item.disabled}
            />
            <span className="input-radio__circle" />
          </span>
        </span>
        <span className="filter-list__title">{item.label}</span>
        {count}
      </label>
    );
  });

  return (
    <div className="filter-list">
      <div className="filter-list__list">{itemsList}</div>
    </div>
  );
}

export default FilterRadio;
