import * as React from 'react';
import { observer } from 'mobx-react';
import InputRange from 'react-input-range';
import { injectIntl } from 'react-intl';
import { AppContext } from '../../../core/Store/context';
import { setCurrencies } from '../../../translations/currencies.messages';
import './FilterPrice.scss';

interface Props {
  from: number;
  to: number;
  min: number;
  max: number;
  step: number;
}

const FilterPrice = observer(
  ({
    from = undefined,
    to = undefined,
    min = 0,
    max = 100,
    step = 1,
    ...otherProps
  }: Props) => {
    const {
      currencyStore,
      productsStore,
      productsCategoriesStore,
    } = React.useContext(AppContext);
    const currencies = setCurrencies(otherProps);
    const [fromState, setFromState] = React.useState(0);
    const [toState, setToState] = React.useState(0);

    const handleChange = (value: any) => {
      setFromState(value.min);
      setToState(value.max);
    };

    const submit = (from: any, to: any) => {
      productsStore.getProducts({
        per_page: productsStore.countProducts,
        'filter[limit]': productsStore.countProducts,
        order: 'desc',
        category: productsCategoriesStore.categoryId,
        min_price: from,
        max_price: to,
      });
    };

    const stateFrom = fromState;
    const stateTo = toState;
    const propsFrom = from;
    const propsTo = to;
    const { currency } = currencyStore;

    const fromPrice: any = Math.max(stateFrom || propsFrom || min, min);
    const toPrice = Math.min(stateTo || propsTo || max, max);
    const fromLabel = from;
    const toLabel = to;

    return (
      <div className="filter-price">
        <div className="filter-price__slider" dir="ltr">
          <InputRange
            minValue={min}
            maxValue={max}
            value={{ min: fromPrice, max: toPrice }}
            step={step}
            onChange={handleChange}
            onChangeComplete={() => submit(fromLabel, toLabel)}
          />
        </div>
        <div className="filter-price__title">
          Price:{' '}
          <span className="filter-price__min-value">
            {currencies(currency)} {fromLabel}
          </span>
          {' – '}
          <span className="filter-price__max-value">
            {currencies(currency)} {toLabel}
          </span>
        </div>
      </div>
    );
  }
);

export default injectIntl(FilterPrice);
