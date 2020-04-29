import * as React from 'react';
import { observer } from 'mobx-react';
import { injectIntl } from 'react-intl';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { AppContext } from '../../../core/Store/context';
import setMessages from '../../../utils/setMessages';
import { setCurrencies } from '../../../translations/currencies.messages';
import messages from './ProductCard.messages';
import Button from '../../../components/Button';
// import Rating from '../../../components/Rating'
import './ProductCard.scss';

interface Props {
  product: any;
  layout: 'grid-sm' | 'grid-nl' | 'grid-lg' | 'list' | 'horizontal';
}

const ProductCard = observer(({ product, layout, ...otherProps }: Props) => {
  const {
    currencyStore,
    cartAddProductStore,
    modalStore,
    loginStore,
    wishlistAddProductStore,
  } = React.useContext(AppContext);

  const message = setMessages(otherProps, messages, 'app.productCard.');
  const currencies = setCurrencies(otherProps);

  const containerClasses = () => {
    return classNames('product-card', {
      'product-card--layout--grid product-card--size--sm': layout === 'grid-sm',
      'product-card--layout--grid product-card--size--nl': layout === 'grid-nl',
      'product-card--layout--grid product-card--size--lg': layout === 'grid-lg',
      'product-card--layout--list': layout === 'list',
      'product-card--layout--horizontal': layout === 'horizontal',
    });
  };

  const badges = () => {
    const badges: any = [];

    product.tags.map((item: any) =>
      badges.push(
        <div
          key={item.id}
          className={`product-card__badge product-card__badge--${item.slug}`}
        >
          {item.name}
        </div>
      )
    );

    return badges.length ? (
      <div className="product-card__badges-list">{badges}</div>
    ) : null;
  };

  const image =
    product.images && product.images.length > 0 ? (
      <div className="product-card__image">
        <Link to={`/category/product/${product.id}`}>
          <img
            className="product-card__image--primary"
            src={product.images[0].src}
            alt=""
          />
          <img
            className="product-card__image--optional"
            src={product.images[1].src}
            alt=""
          />
        </Link>
        <div className="product-card__quick">
          <button
            onClick={() => modalStore.openProduct(product.id)}
            className="product-card__quickview"
          >
            Quick view
          </button>
        </div>
      </div>
    ) : (
      <div className="product-card__image">
        <Link to={`/category/product/${product.id}`}>
          <img src="/assets/img/products/default.jpg" alt="" />
        </Link>
      </div>
    );

  const price = () => {
    return product.sale_price ? (
      <div className="product-card__prices">
        <span className="product-card__new-price">
          {currencies('value', {
            value: product.regular_price,
            currency: currencies(currencyStore.currency),
          })}
        </span>{' '}
        <span className="product-card__old-price">
          {currencies('value', {
            value: product.sale_price,
            currency: currencies(currencyStore.currency),
          })}
        </span>
      </div>
    ) : (
      <div className="product-card__prices">
        {currencies('value', {
          value: product.price,
          currency: currencies(currencyStore.currency),
        })}
      </div>
    );
  };

  const features =
    product.features && product.features.length ? (
      <ul className="product-card__features-list">
        {product.features.map((feature: any, index: any) => (
          <li key={index}>{`${feature.name}: ${feature.value}`}</li>
        ))}
      </ul>
    ) : null;

  const attributeSize = () => {
    let attributeSize: any = [];
    product.attributes.map((item: any, index: any) => {
      if (item.name === 'Size') {
        attributeSize = item.options;
      }
    });

    return attributeSize.length ? (
      <div className="product-card__size">Size: {attributeSize.join(', ')}</div>
    ) : null;
  };

  const attributeColor = () => {
    const attributeColor: any = [];
    product.attributes.map((item: any, index: any) => {
      if (item.name === 'Color') {
        item.options.map((item: any, index: any) => {
          attributeColor.push(
            <span
              key={index}
              className={`product-card__color-item product-card__color-item--${item}`}
              style={{ backgroundColor: item }}
              title={item}
            />
          );
        });
      }
    });

    return attributeColor.length ? (
      <div className="product-card__color">{attributeColor}</div>
    ) : null;
  };

  return (
    <div className={containerClasses()}>
      <div className="product-card__buttons">
        <Button
          className="btn__addtocart"
          onClick={() => cartAddProductStore.addProduct(product.id)}
        >
          <i className="fas fa-shopping-cart" />
        </Button>
        <Button
          className="btn__wishlist"
          onClick={() =>
            loginStore.loggedIn
              ? wishlistAddProductStore.addProduct(product.id)
              : modalStore.openLogin()
          }
        >
          <i className="far fa-heart" />
        </Button>
      </div>
      {badges()}
      {image}
      {attributeColor()}
      <div className="product-card__info">
        <div className="product-card__name">
          <Link to={`/category/product/${product.id}`}>{product.name}</Link>
        </div>
        {price()}
        {/*
        <div className='product-card__rating'>
          <div className=' product-card__rating-legend'>{`Review: ${product.rating_count}`}</div>
          <Rating value={product.rating_count} />
        </div>
        */}
        {features}
      </div>
    </div>
  );
});

export default injectIntl(ProductCard);
