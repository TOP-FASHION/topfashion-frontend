import * as React from 'react';
import { Redirect } from 'react-router-dom';
// import { Helmet } from 'react-helmet'
import { observer } from 'mobx-react';
import { AppContext } from '../../store/context';
import PageHeader from '../../containers/shared/PageHeader';
import ProductsView from '../../containers/productList/ProductsView/ProductsView';

interface Props {
  viewMode?: 'grid' | 'grid-with-features' | 'list';
}

const SearchPage = observer(({ viewMode = 'grid' }: Props) => {
  const { productSearchStore } = React.useContext(AppContext);

  const breadcrumb = [
    { title: 'Home', url: '' },
    { title: 'Search', url: '' },
  ];

  const content = () => {
    return (
      <>
        <div className="container">
          <div className="block">
            <ProductsView
              products={productSearchStore.productBySearch}
              layout={viewMode}
              grid="grid-4-full"
              offcanvas="mobile"
            />
          </div>
        </div>
      </>
    );
  };

  return productSearchStore.productBySearch ? (
    <>
      <PageHeader breadcrumb={breadcrumb} />
      {content}
    </>
  ) : (
    <Redirect to="/" />
  );
});

export default SearchPage;
