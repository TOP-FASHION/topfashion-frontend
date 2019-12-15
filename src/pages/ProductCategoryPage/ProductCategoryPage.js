import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import { Helmet } from 'react-helmet';
import PageHeader from '../../containers/PageHeader'
import ProductsView from '../../containers/ProductsView'
import CategorySidebar from '../../containers/CategorySidebar'
// import BlockProductsCarousel from '../blocks/BlockProductsCarousel'
// import WidgetCategories from '../widgets/WidgetCategories'
// import WidgetProducts from '../widgets/WidgetProducts'
// import categories from '../../data/shopWidgetCategories'
import { inject, observer } from 'mobx-react'
import normalizeCategory from '../../utils/normalizeCategory'
import normalizeParentCategory from '../../utils/normalizeParentCategory'
import './ProductCategoryPage.scss'

@inject('productsStore', 'productsCategoriesStore')
@observer
class ProductCategoryPage extends Component {
  static propTypes = {
    columns: PropTypes.number,
    viewMode: PropTypes.oneOf(['grid', 'grid-with-features', 'list']),
    sidebarPosition: PropTypes.oneOf(['start', 'end'])
  };

  static defaultProps = {
    columns: 3,
    viewMode: 'grid',
    sidebarPosition: 'start'
  };

  componentDidMount () {
    this.props.productsStore.getProducts({
      page: 1,
      per_page: this.props.productsStore.countProducts,
      'filter[limit]': this.props.productsStore.countProducts,
      category: normalizeCategory(this.props.match.params.categoryId)
    })
    this.props.productsCategoriesStore.categoryId = normalizeCategory(this.props.match.params.categoryId)
  }

  get breadcrumb () {
    return [
      { title: 'Home', url: '' },
      { title: 'Category', url: '/category' },
      { title: normalizeParentCategory(this.props.match.params.categoryId), url: normalizeParentCategory(this.props.match.params.categoryId) },
      { title: this.props.match.params.categoryId, url: this.props.match.params.categoryId }
    ]
  }

  get content () {
    const { products } = this.props.productsStore
    let content

    const offcanvas = this.props.columns === 3 ? 'mobile' : 'always'
    console.log('products', products)
    if (this.props.columns > 3) {
      content = (
        <div className='container'>
          <div className='block'>
            <ProductsView
              products={products}
              layout={this.props.viewMode}
              grid={`grid-${this.props.columns}-full`}
              limit={15}
              offcanvas={offcanvas}
            />
          </div>
          {<CategorySidebar offcanvas={offcanvas} />}
        </div>
      )
    } else {
      const sidebar = (
        <div className='shop-layout__sidebar'>{<CategorySidebar offcanvas={offcanvas} />}</div>
      )

      content = (
        <div className='container'>
          <div className={`shop-layout shop-layout--sidebar--${this.props.sidebarPosition}`}>
            {this.props.sidebarPosition === 'start' && sidebar}
            <div className='shop-layout__content'>
              <div className='block'>
                <ProductsView
                  products={products}
                  layout={this.props.viewMode}
                  grid='grid-4-full'
                  limit={15}
                  offcanvas={offcanvas}
                />
              </div>
            </div>
            {this.props.sidebarPosition === 'end' && sidebar}
          </div>
        </div>
      )
    }
    return content
  }

  render () {
    return (
      <React.Fragment>
        <PageHeader header='Category' breadcrumb={this.breadcrumb} />
        {this.content}
      </React.Fragment>
    )
  }
}

export default ProductCategoryPage
