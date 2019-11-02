import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './WidgetProducts.scss'

function WidgetProducts(props) {
  const { title, products } = props;
  console.log('products', products)
  const productsList = products.map((product) => {
    let image;
    let price;

    if (product.images && product.images.length > 0) {
      image = (
        <div className="widget-products__image">
          <Link to="/"><img src={product.images[0].src} alt="" /></Link>
        </div>
      );
    }

    if (product.compareAtPrice) {
      price = (
        <React.Fragment>
          <span className="widget-products__new-price">''</span>
          {' '}
          <span className="widget-products__old-price">''</span>
        </React.Fragment>
      );
    } else {
      price = '';
    }

    return (
      <div key={product.id} className="widget-products__item">
        {image}
        <div className="widget-products__info">
          <div className="widget-products__name">
            <Link to="/">{product.name}</Link>
          </div>
          <div className="widget-products__prices">
            {price}
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="widget-products widget">
      <h4 className="widget__title">{title}</h4>
      <div className="widget-products__list">
        {productsList}
      </div>
    </div>
  );
}

WidgetProducts.propTypes = {
  /**
   * widget title
   */
  title: PropTypes.node,
  /**
   * array of product objects
   */
  products: PropTypes.array,
};

WidgetProducts.defaultProps = {
  products: [],
};

export default WidgetProducts;
