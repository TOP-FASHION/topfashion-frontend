import * as React from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import { AppContext } from '../../../store/context';
import './FilterColor.scss';

const FilterColor = observer(() => {
  const { productAttributesStore } = React.useContext(AppContext);

  React.useEffect(() => {
    productAttributesStore.getAttributeTerms(3);
  }, []);

  const itemsList = () => {
    const { attributeTerms } = productAttributesStore;

    return attributeTerms
      ? attributeTerms.map((item: any) => (
          <div key={item} className="filter-color__item">
            <span
              className={classNames('filter-color__check input-check-color', {
                'input-check-color--white': item === 'White',
                'input-check-color--light': item,
              })}
              style={{ color: item }}
            >
              <label className="input-check-color__body">
                <input
                  className="input-check-color__input"
                  type="checkbox"
                  defaultChecked={item.checked}
                  disabled={item.disabled}
                />
                <span className="input-check-color__box" />
                <i className="input-check-color__icon fas fa-check" />
                <span className="input-check-color__stick" />
              </label>
            </span>
          </div>
        ))
      : null;
  };

  return (
    <div className="filter-color">
      <div className="filter-color__list">{itemsList()}</div>
    </div>
  );
});

export default FilterColor;
