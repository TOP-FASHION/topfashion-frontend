import * as React from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import { Form } from 'react-bootstrap';
import { RouteComponentProps, withRouter } from 'react-router';
import { AppContext } from '../../../core/Store/context';
// import { injectIntl } from 'react-intl'
// import setMessages from '../../utils/setMessages'
// import messages from './ProductCard.messages'
import ProductsList from '../ProductsList';
import Pagination from '../../../components/Pagination';
import Fragment from '../../../components/Fragment';
// import normalizeCategory from '../../../utils/normalizeCategory'
import './ProductsView.scss';

interface MatchParams {
  match?: any;
}

interface Props extends RouteComponentProps<MatchParams> {
  products: Array<any>;
  layout?: 'grid' | 'grid-with-features' | 'list';
  grid?: 'grid-3-sidebar' | 'grid-4-sidebar' | 'grid-4-full' | 'grid-5-full';
  offcanvas: 'always' | 'mobile';
}

const ProductsView = observer(
  ({
    products = [],
    layout = 'grid',
    grid = 'grid-4-sidebar',
    offcanvas = 'mobile',
    ...otherProps
  }: Props) => {
    const {
      productsStore,
      productsCategoriesStore,
      mobileMenuStore,
    } = React.useContext(AppContext);
    const [page, setPage] = React.useState(1);
    const [limitPage, setLimitPage] = React.useState(null);
    const [order, setOrder] = React.useState(null);
    const [layoutState, setLayoutState] = React.useState('');

    const handlePageChange = (page: any) => {
      productsStore.getProducts({
        page,
        // eslint-disable-next-line @typescript-eslint/camelcase
        per_page: limitPage || productsStore.countProducts,
        'filter[limit]': limitPage || productsStore.countProducts,
        order: order || 'desc',
        /*
      category: normalizeCategory(otherProps.match.params.categoryId)
      */
      });
      setPage(page);
    };

    const totalPage = parseFloat(productsStore.pagesProducts);

    const sort = (e: any) => {
      productsStore.getProducts({
        page,
        // eslint-disable-next-line @typescript-eslint/camelcase
        per_page: productsStore.countProducts,
        'filter[limit]': productsStore.countProducts,
        order: e.target.value || 'desc',
        category: productsCategoriesStore.categoryId,
      });
      setOrder(e.target.value);
    };

    const filter = (e: any) => {
      productsStore.getProducts({
        page,
        // eslint-disable-next-line @typescript-eslint/camelcase
        per_page: e.target.value || productsStore.countProducts,
        'filter[limit]': e.target.value || productsStore.countProducts,
        order: order || 'desc',
        category: productsCategoriesStore.categoryId,
      });
      setLimitPage(e.target.value);
    };

    const viewModes = () => {
      const propsLayout: any = layout;
      const stateLayout: any = layoutState;
      const layoutnew = stateLayout || propsLayout;

      const viewModes = [
        { key: 'grid', title: 'Grid', icon: <i className="fas fa-th-large" /> },
        { key: 'list', title: 'List', icon: <i className="fas fa-th" /> },
      ];

      return viewModes.map((viewMode) => {
        const className = classNames('layout-switcher__button', {
          'layout-switcher__button--active': layoutnew === viewMode.key,
        });

        return (
          <button
            key={viewMode.key}
            title={viewMode.title}
            type="button"
            className={className}
            onClick={() => setLayoutState(viewMode.key)}
          >
            {viewMode.icon}
          </button>
        );
      });
    };

    const viewOptionsClasses = classNames('view-options', {
      'view-options--offcanvas--always': offcanvas === 'always',
      'view-options--offcanvas--mobile': offcanvas === 'mobile',
    });

    const loadClasses = classNames('products-list__body', {
      'products-list__body--loading': productsStore.isLoadingProducts,
      'products-list__not-found': products.length === 0,
    });

    const propsLayout: any = layout;
    const stateLayout: any = layoutState;
    const layoutnew = stateLayout || propsLayout;

    return (
      <div className="products-view">
        <div className="products-view__options">
          <div className={viewOptionsClasses}>
            <div className="view-options__filters-button">
              <button
                type="button"
                className="filters-button"
                onClick={() => mobileMenuStore.openMobileFilter()}
              >
                <i className="filters-button__icon fas fa-sliders-h" />
                <span className="filters-button__title">Filters</span>
                <span className="filters-button__counter">3</span>
              </button>
            </div>
            <div className="view-options__layout">
              <div className="layout-switcher">
                <div className="layout-switcher__list">{viewModes()}</div>
              </div>
            </div>
            <div className="view-options__legend">
              Showing{' '}
              {productsStore.countProducts > productsStore.totalProducts
                ? productsStore.totalProducts
                : productsStore.countProducts}{' '}
              of {productsStore.totalProducts} products
            </div>
            <div className="view-options__divider" />
            <div className="view-options__control">
              <Form.Label>Sort By</Form.Label>
              <div>
                <Form.Control
                  as="select"
                  className="form-control form-control-sm"
                  name=""
                  onChange={sort}
                >
                  <option value="desc">Default</option>
                  <option value="asc">Name (A-Z)</option>
                </Form.Control>
              </div>
            </div>
            <div className="view-options__control">
              <Form.Label>Show</Form.Label>
              <div>
                <Form.Control
                  as="select"
                  className="form-control form-control-sm"
                  id="view-options-limit"
                  name=""
                  onChange={filter}
                >
                  <option value="12">12</option>
                  <option value="16">16</option>
                </Form.Control>
              </div>
            </div>
          </div>
        </div>

        <div
          className="products-view__list products-list"
          data-layout={layout !== 'list' ? grid : layoutnew}
          data-with-features={
            layout === 'grid-with-features' ? 'true' : 'false'
          }
        >
          <div className={loadClasses}>
            {products.length > 0 ? (
              <ProductsList products={products} />
            ) : (
              'ничего нет'
            )}
          </div>
        </div>

        <Fragment hidden={products.length === 0}>
          <div className="products-view__pagination">
            <Pagination
              current={page}
              siblings={2}
              total={totalPage}
              onPageChange={handlePageChange}
            />
          </div>
        </Fragment>
      </div>
    );
  }
);

export default withRouter(ProductsView);
