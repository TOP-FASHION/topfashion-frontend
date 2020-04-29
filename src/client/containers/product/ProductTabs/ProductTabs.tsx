import * as React from 'react';
import classNames from 'classnames';
import ProductTabDescription from '../ProductTabDescription';
import ProductTabSpecification from '../ProductTabSpecification';
import ProductTabReviews from '../ProductTabReviews';
import './ProductTabs.scss';

interface Props {
  product?: any;
  withSidebar?: boolean;
}

const ProductTabs = ({ product, withSidebar = false }: Props) => {
  const [currentTab, setCurrentTab] = React.useState('description');

  const classes = classNames('product-tabs', {
    'product-tabs--layout--sidebar': withSidebar,
  });

  const tabs = [
    {
      key: 'description',
      title: 'Description',
      content: <ProductTabDescription />,
    },
    {
      key: 'specification',
      title: 'Specification',
      content: <ProductTabSpecification />,
    },
    {
      key: 'reviews',
      title: 'Reviews',
      content: <ProductTabReviews product={product} />,
    },
  ];

  const tabsButtons = tabs.map((tab) => {
    const classes = classNames('product-tabs__item', {
      'product-tabs__item--active': currentTab === tab.key,
    });

    return (
      <button
        key={tab.key}
        type="button"
        onClick={() => setCurrentTab(tab.key)}
        className={classes}
      >
        {tab.title}
      </button>
    );
  });

  const tabsContent = tabs.map((tab) => {
    const classes = classNames('product-tabs__pane', {
      'product-tabs__pane--active': currentTab === tab.key,
    });

    return (
      <div key={tab.key} className={classes}>
        {tab.content}
      </div>
    );
  });

  return (
    <div className={classes}>
      <div className="product-tabs__list">{tabsButtons}</div>
      <div className="product-tabs__content">{tabsContent}</div>
    </div>
  );
};

export default ProductTabs;
