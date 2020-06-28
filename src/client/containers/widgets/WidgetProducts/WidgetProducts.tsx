import React from 'react';
import { observer } from 'mobx-react';
import { injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { AppContext } from '../../../store/context';
// import setMessages from '../../../utils/setMessages'
import { setCurrencies } from '../../../translations/currencies.messages';
import './WidgetProducts.scss';

interface Props {
  title?: any;
}

const WidgetProducts = observer(({ title, ...otherProps }: Props) => {
  const { currencyStore } = React.useContext(AppContext);
  const currencies = setCurrencies(otherProps);
  let lastProducts: any;
  if (typeof window !== 'undefined') {
    lastProducts = window.localStorage.getItem('lastProducts');
    lastProducts = JSON.parse(lastProducts);
  }

  const productsList = lastProducts
    ? lastProducts.map((product: any) => {
        let image;
        let price;

        if (product.images && product.images.length > 0) {
          image = (
            <div className="widget-products__image">
              <Link to={`/category/product/${product.id}`}>
                <img src={product.images[0].src} alt="" />
              </Link>
            </div>
          );
        }

        if (product.sale_price) {
          price = (
            <>
              <span className="widget-products__new-price">
                {currencies('value', {
                  value: product.price,
                  currency: currencies(currencyStore.currency),
                })}
              </span>{' '}
              <span className="widget-products__old-price">
                {currencies('value', {
                  value: product.sale_price,
                  currency: currencies(currencyStore.currency),
                })}
              </span>
            </>
          );
        } else {
          price = (
            <span className="widget-products__new-price">
              {currencies('value', {
                value: product.price,
                currency: currencies(currencyStore.currency),
              })}
            </span>
          );
        }

        return (
          <div key={product.id} className="widget-products__item">
            {image}
            <div className="widget-products__info">
              <div className="widget-products__name">
                <Link to={`/category/product/${product.id}`}>
                  {product.name}
                </Link>
              </div>
              <div className="widget-products__prices">{price}</div>
            </div>
          </div>
        );
      })
    : null;

  return lastProducts ? (
    <div className="widget-products widget">
      <h4 className="widget__title">{title}</h4>
      <div className="widget-products__list">{productsList}</div>
    </div>
  ) : null;
});

export default injectIntl(WidgetProducts);
