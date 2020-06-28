import * as React from 'react';
import { Helmet } from 'react-helmet';
import { reaction } from 'mobx';
import { observer } from 'mobx-react';
import { useParams } from 'react-router';
import { AppContext } from '../../store/context';
import PageHeader from '../../containers/shared/PageHeader';
import ProductsView from '../../containers/productList/ProductsView';
import CategorySidebar from '../../containers/product/CategorySidebar';
// import WidgetCategories from '../widgets/WidgetCategories'
import normalizeCategory from '../../utils/normalizeCategory';
import normalizeParentCategory from '../../utils/normalizeParentCategory';
import './ProductCategoryPage.scss';

interface Props {
  columns?: number;
  viewMode?: 'grid' | 'grid-with-features' | 'list';
  sidebarPosition?: 'start' | 'end';
}

const ProductCategoryPage = observer(
  ({ columns = 4, viewMode = 'grid', sidebarPosition = 'start' }: Props) => {
    const { productsStore, productsCategoriesStore } = React.useContext(
      AppContext
    );
    const params: any = useParams();

    React.useEffect(() => {
      reaction(
        () => params.categoryId,
        async () => {
          try {
            productsStore.getProducts({
              page: 1,
              // eslint-disable-next-line @typescript-eslint/camelcase
              per_page: productsStore.countProducts,
              'filter[limit]': productsStore.countProducts,
              category: normalizeCategory(params.categoryId),
            });
            productsCategoriesStore.categoryId = normalizeCategory(
              params.categoryId
            );
          } catch {
            console.log('error');
          }
        },
        { fireImmediately: true }
      );
    }, [params.categoryId]);

    const breadcrumb = [
      { title: 'Home', url: '' },
      { title: 'Category', url: '/category' },
      {
        title: normalizeParentCategory(params.categoryId),
        url: normalizeParentCategory(params.categoryId),
      },
      { title: params.categoryId, url: params.categoryId },
    ];

    const content = () => {
      const { products } = productsStore;
      let content;

      const offcanvas = columns === 3 || columns === 4 ? 'mobile' : 'always';

      if (columns > 4) {
        content = (
          <div className="container-fluid">
            <div className="block">
              <ProductsView
                products={products}
                layout={viewMode}
                grid="grid-4-full"
                offcanvas={offcanvas}
              />
            </div>
            <CategorySidebar offcanvas={offcanvas} />
          </div>
        );
      } else {
        const sidebar = (
          <div className="shop-layout__sidebar">
            <CategorySidebar offcanvas={offcanvas} />
          </div>
        );

        content = (
          <div className="container-fluid">
            <div
              className={`shop-layout shop-layout--sidebar--${sidebarPosition}`}
            >
              {sidebarPosition === 'start' && sidebar}
              <div className="shop-layout__content">
                <div className="block">
                  <ProductsView
                    products={products}
                    layout={viewMode}
                    grid="grid-3-sidebar"
                    offcanvas={offcanvas}
                  />
                </div>
              </div>
              {sidebarPosition === 'end' && sidebar}
            </div>
          </div>
        );
      }
      return content;
    };

    return (
      <>
        <Helmet>
          <title>Category Page</title>
        </Helmet>
        <PageHeader
          header={params.categoryId || 'Category'}
          breadcrumb={breadcrumb}
        />
        {content()}
      </>
    );
  }
);

export default ProductCategoryPage;
