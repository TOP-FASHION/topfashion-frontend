import * as React from 'react';
import { observer } from 'mobx-react';
import { injectIntl } from 'react-intl';
import { AppContext } from '../../../store/context';
import ProductsBlockHeader from '../ProductsBlockHeader';
import ProductCard from '../../product/ProductCard';
import './ProductsBlock.scss';

interface Props {
  title?: any;
  layout?: 'large-first' | 'large-last';
}

const ProductsBlock = observer(({ title, layout = 'large-first' }: Props) => {
  const { productsStore } = React.useContext(AppContext);
  const { products } = productsStore;

  React.useEffect(() => {
    productsStore.getProducts();
  }, []);

  const featuredProduct = products ? (
    <div className="block-products__featured">
      <div className="block-products__featured-item">
        <ProductCard product={products[0]} />
      </div>
    </div>
  ) : null;

  const productsList =
    products && products.length > 0 ? (
      <div className="block-products__list">
        {products.slice(0, 6).map((product, index) => (
          <div key={index} className="block-products__list-item">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    ) : null;

  return products && products.length ? (
    <div className={`block block-products block-products--layout--${layout}`}>
      <div className="container">
        <ProductsBlockHeader title={title} />
        <div className="block-products__body">
          {layout === 'large-first' && featuredProduct}
          {productsList}
          {layout === 'large-last' && featuredProduct}
        </div>
      </div>
    </div>
  ) : null;
});

export default injectIntl(ProductsBlock);
