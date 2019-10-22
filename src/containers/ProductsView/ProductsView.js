import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl'
import setMessages from '../../utils/setMessages'
//import messages from './ProductCard.messages'
import ProductsList from '../ProductsList'
import Pagination from '../Pagination'
import './ProductsView.scss'

class ProductsView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
    };
  }

  static propTypes = {
    products: PropTypes.array,
    layout: PropTypes.oneOf(['grid', 'grid-with-features', 'list']),
    grid: PropTypes.oneOf(['grid-3-sidebar', 'grid-4-full', 'grid-5-full']),
    offcanvas: PropTypes.oneOf(['always', 'mobile']),
  }

  static defaultProps = {
    products: [],
    layout: 'grid',
    grid: 'grid-3-sidebar',
    offcanvas: 'mobile',
  };

  setLayout = (layout) => {
    this.setState(() => ({ layout }));
  };

  handlePageChange = (page) => {
    this.setState(() => ({ page }));
  };

  get viewModes () {
    const { layout: propsLayout } = this.props;
    const { layout: stateLayout } = this.state;
    const layout = stateLayout || propsLayout;

    let viewModes = [
      { key: 'grid', title: 'Grid', icon: <i className="fas fa-th-large"></i> },
      { key: 'grid-with-features', title: 'Grid With Features', icon: <i className="fas fa-grip-lines-vertical"></i> },
      { key: 'list', title: 'List', icon: <i className="fas fa-grip-lines"></i> },
    ];

    return viewModes.map((viewMode) => {
      const className = classNames('layout-switcher__button', {
        'layout-switcher__button--active': layout === viewMode.key,
      });

      console.log('this.props.layout', this.props.layout)
      console.log('viewMode.key', viewMode.key)
      return (
        <button
          key={viewMode.key}
          title={viewMode.title}
          type="button"
          className={className}
          onClick={() => this.setLayout(viewMode.key)}
        >
          {viewMode.icon}
        </button>
      );
    });
  }

  get viewOptionsClasses () {
    return classNames('view-options', {
      'view-options--offcanvas--always': this.props.offcanvas === 'always',
      'view-options--offcanvas--mobile': this.props.offcanvas === 'mobile',
    });
  }

  get totalPage () {
    return Math.ceil(this.props.products.length / 3)
  }

  changePage = page => {
    this.props.productReviewsStore.getProductReviews(this.props.product.id, page)
    this.setState(() => ({ page }));
  };

  render() {
    const { products, grid, layout: propsLayout } = this.props;
    const { page, layout: stateLayout } = this.state;
    const layout = stateLayout || propsLayout;

    return (
      <div className="products-view">
        <div className="products-view__options">
          <div className={this.viewOptionsClasses}>
            <div className="view-options__filters-button">
              <button type="button" className="filters-button">
                {/*<Filters16Svg className="filters-button__icon" />*/}
                <span className="filters-button__title">Filters</span>
                <span className="filters-button__counter">3</span>
              </button>
            </div>
            <div className="view-options__layout">
              <div className="layout-switcher">
                <div className="layout-switcher__list">
                  {this.viewModes}
                </div>
              </div>
            </div>
            <div className="view-options__legend">Showing 6 of 98 products</div>
            <div className="view-options__divider" />
            <div className="view-options__control">
              <label htmlFor="view-options-sort">Sort By</label>
              <div>
                <select className="form-control form-control-sm" name="" id="view-options-sort">
                  <option value="">Default</option>
                  <option value="">Name (A-Z)</option>
                </select>
              </div>
            </div>
            <div className="view-options__control">
              <label htmlFor="view-options-limit">Show</label>
              <div>
                <select className="form-control form-control-sm" name="" id="view-options-limit">
                  <option value="">12</option>
                  <option value="">24</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div
          className="products-view__list products-list"
          data-layout={layout !== 'list' ? grid : layout}
          data-with-features={layout === 'grid-with-features' ? 'true' : 'false'}
        >
          <div className="products-list__body">
            <ProductsList products={products} layout='grid-sm'/>
          </div>
        </div>

        <div className="products-view__pagination">
          <Pagination
            current={page}
            siblings={2}
            total={10}
            onPageChange={this.handlePageChange}
          />
          <Pagination
            current={page}
            siblings={2}
            total={this.totalPage}
            onPageChange={this.changePage}
          />
        </div>
      </div>
    );
  }
}

export default injectIntl(ProductsView)
