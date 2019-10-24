import React from 'react';
import { FormattedMessage } from 'react-intl';
import Dropdown from '../../components/Dropdown/index';
import currencies from '../../data/shopCurrencies';

function DropdownCurrency(props) {
  const { currency, currencyChange: changeCurrency } = props;

  const title = (
    <React.Fragment>
      Currency
      {': '}
      <span className="topbar__item-value">USD</span>
    </React.Fragment>
  );

  return (
    <Dropdown
      title={title}
      items={currencies}
      onClick={(item) => changeCurrency(item.currency)}
    />
  );
}

export default DropdownCurrency
