import React, { Component } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
// import { injectIntl } from 'react-intl'
// import setMessages from '../../utils/setMessages'
// import messages from './ProductCard.messages'
import ProductsList from '../ProductsList'
import Pagination from '../Pagination'
import { Form } from 'react-bootstrap'
import normalizeCategory from '../../../utils/normalizeCategory'
import { withRouter } from 'react-router'
import './ProductsView.scss'

@inject('productsStore', 'productsCategoriesStore', 'mobileMenuStore')
@observer
class ProductsView extends Component {
  constructor (props) {
    super(props)

    this.state = {
      page: 1
    }
  }

  static propTypes = {
    productsStore: PropTypes.any,
    productsCategoriesStore: PropTypes.any,
    mobileMenuStore: PropTypes.any,
    products: PropTypes.array,
    layout: PropTypes.oneOf(['grid', 'grid-with-features', 'list']),
    grid: PropTypes.oneOf(['grid-3-sidebar', 'grid-4-sidebar', 'grid-4-full', 'grid-5-full']),
    offcanvas: PropTypes.oneOf(['always', 'mobile']),
    match: PropTypes.shape({
      params: PropTypes.shape({
        categoryId: PropTypes.string
      })
    })
  }

  static defaultProps = {
    products: [],
    layout: 'grid',
    grid: 'grid-4-sidebar',
    offcanvas: 'mobile'
  };

  setLayout = (layout) => {
    this.setState(() => ({ layout }))
  };

  handlePageChange = (page) => {
    this.props.productsStore.getProducts({
      page: page,
      per_page: this.state.limitPage || this.props.productsStore.countProducts,
      'filter[limit]': this.state.limitPage || this.props.productsStore.countProducts,
      order: this.state.order || 'desc',
      category: normalizeCategory(this.props.match.params.categoryId)
    })
    this.setState(() => ({ page }))
  };

  get totalPage () {
    return parseFloat(this.props.productsStore.pagesProducts)
  }

  get totalProducts () {
    return this.props.productsStore.totalProducts
  }

  sort = e => {
    this.props.productsStore.getProducts({
      page: this.state.page,
      per_page: this.props.productsStore.countProducts,
      'filter[limit]': this.props.productsStore.countProducts,
      order: e.target.value || 'desc',
      category: this.props.productsCategoriesStore.categoryId
    })
    this.state.order = e.target.value
  };

  filter = e => {
    this.props.productsStore.getProducts({
      page: this.state.page,
      per_page: e.target.value || this.props.productsStore.countProducts,
      'filter[limit]': e.target.value || this.props.productsStore.countProducts,
      order: this.state.order || 'desc',
      category: this.props.productsCategoriesStore.categoryId
    })
    this.state.limitPage = e.target.value
  };

  openMobileFilter = () => {
    this.props.mobileMenuStore.openMobileFilter()
  }

  get viewModes () {
    const { layout: propsLayout } = this.props
    const { layout: stateLayout } = this.state
    const layout = stateLayout || propsLayout

    const viewModes = [
      { key: 'grid', title: 'Grid', icon: <i className='fas fa-th-large' /> },
      { key: 'list', title: 'List', icon: <i className='fas fa-equals' /> }
    ]

    return viewModes.map((viewMode) => {
      const className = classNames('layout-switcher__button', {
        'layout-switcher__button--active': layout === viewMode.key
      })

      return (
        <button
          key={viewMode.key}
          title={viewMode.title}
          type='button'
          className={className}
          onClick={() => this.setLayout(viewMode.key)}
        >
          {viewMode.icon}
        </button>
      )
    })
  }

  get viewOptionsClasses () {
    return classNames('view-options', {
      'view-options--offcanvas--always': this.props.offcanvas === 'always',
      'view-options--offcanvas--mobile': this.props.offcanvas === 'mobile'
    })
  }

  get loadClasses () {
    return classNames('products-list__body', {
      'products-list__body--loading': this.props.productsStore.isLoadingProducts
    })
  }

  render () {
    const { products, grid, layout: propsLayout } = this.props
    const { page, layout: stateLayout } = this.state
    const layout = stateLayout || propsLayout

    return (
      <div className='products-view'>
        <div className='products-view__options'>
          <div className={this.viewOptionsClasses}>
            <div className='view-options__filters-button'>
              <button type='button' className='filters-button' onClick={() => this.openMobileFilter()}>
                <i className='filters-button__icon fas fa-sliders-h' />
                <span className='filters-button__title'>Filters</span>
                <span className='filters-button__counter'>3</span>
              </button>
            </div>
            <div className='view-options__layout'>
              <div className='layout-switcher'>
                <div className='layout-switcher__list'>
                  {this.viewModes}
                </div>
              </div>
            </div>
            <div className='view-options__legend'>Showing {this.props.productsStore.countProducts > this.totalProducts ? this.totalProducts : this.props.productsStore.countProducts} of {this.totalProducts} products</div>
            <div className='view-options__divider' />
            <div className='view-options__control'>
              <Form.Label>Sort By</Form.Label>
              <div>
                <Form.Control
                  as='select'
                  className='form-control form-control-sm'
                  name=''
                  onChange={this.sort}
                >
                  <option value='desc'>Default</option>
                  <option value='asc'>Name (A-Z)</option>
                </Form.Control>
              </div>
            </div>
            <div className='view-options__control'>
              <Form.Label>Show</Form.Label>
              <div>
                <Form.Control
                  as='select'
                  className='form-control form-control-sm'
                  id='view-options-limit'
                  name=''
                  onChange={this.filter}
                >
                  <option value='12'>12</option>
                  <option value='16'>16</option>
                </Form.Control>
              </div>
            </div>
          </div>
        </div>

        <div
          className='products-view__list products-list'
          data-layout={layout !== 'list' ? grid : layout}
          data-with-features={layout === 'grid-with-features' ? 'true' : 'false'}
        >
          <div className={this.loadClasses}>
            <ProductsList products={products} layout='grid-sm' />
          </div>
        </div>

        <div className='products-view__pagination'>
          <Pagination
            current={page}
            siblings={2}
            total={this.totalPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    )
  }
}

export default withRouter(ProductsView)
