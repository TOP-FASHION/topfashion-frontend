import * as React from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import { AppContext } from '../../../core/Store/context';

const FilterCheckbox = observer((props: any) => {
  const { brandsStore } = React.useContext(AppContext);

  React.useEffect(() => {
    brandsStore.getBrands();
  }, []);

  const itemsList = () => {
    const { brands } = brandsStore;

    return brands
      ? brands.map((item: any) => {
          let count;

          if (item.count) {
            count = <span className="filter-list__counter">{item.count}</span>;
          }

          return (
            <label
              key={item.term_id}
              className={classNames('filter-list__item', {
                'filter-list__item--disabled': item.disabled,
              })}
            >
              <span className="filter-list__input input-check">
                <span className="input-check__body">
                  <input className="input-check__input" type="checkbox" />
                  <span className="input-check__box" />
                  <i className="input-check__icon fas fa-check " />
                </span>
              </span>
              <span className="filter-list__title">{item.name}</span>
              {count}
            </label>
          );
        })
      : null;
  };

  return (
    <div className="filter-list">
      <div className="filter-list__list">{itemsList()}</div>
    </div>
  );
});

export default FilterCheckbox;
