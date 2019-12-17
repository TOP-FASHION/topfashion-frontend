import React, { Component } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
// import setMessages from '../../utils/setMessages'
// import messages from './ProductCard.messages'
import ProductsList from '../ProductsList'
import Pagination from '../Pagination'
import './ProductsView.scss'
import { inject, observer } from 'mobx-react'
import { Form } from 'react-bootstrap'

@inject('productsStore', 'productsCategoriesStore')
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
    products: PropTypes.array,
    layout: PropTypes.oneOf(['grid', 'grid-with-features', 'list']),
    grid: PropTypes.oneOf(['grid-3-sidebar', 'grid-4-full', 'grid-5-full']),
    offcanvas: PropTypes.oneOf(['always', 'mobile'])
  }

  static defaultProps = {
    products: [],
    layout: 'grid',
    grid: 'grid-3-sidebar',
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
      order: this.state.order || 'desc'
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

  get viewModes () {
    const { layout: propsLayout } = this.props
    const { layout: stateLayout } = this.state
    const layout = stateLayout || propsLayout

    const viewModes = [
      { key: 'grid', title: 'Grid', icon: <i className='fas fa-th-large' /> },
      { key: 'grid-with-features', title: 'Grid With Features', icon: <i className='fas fa-grip-lines-vertical' /> },
      { key: 'list', title: 'List', icon: <i className='fas fa-grip-lines' /> }
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

  render () {
    const { products, grid, layout: propsLayout } = this.props
    const { page, layout: stateLayout } = this.state
    const layout = stateLayout || propsLayout

    return (
      <div className='products-view'>
        <div className='products-view__options'>
          <div className={this.viewOptionsClasses}>
            <div className='view-options__filters-button'>
              <button type='button' className='filters-button'>
                {/* <Filters16Svg className="filters-button__icon" /> */}
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
                  <option value='9'>9</option>
                  <option value='12'>12</option>
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
          <div className='products-list__body'>
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

export default injectIntl(ProductsView)
