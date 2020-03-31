import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { reaction } from 'mobx'
import { inject, observer } from 'mobx-react'
import PageHeader from '../../containers/shared/PageHeader'
import ProductsView from '../../containers/shared/ProductsView'
import CategorySidebar from '../../containers/shared/CategorySidebar'
// import WidgetCategories from '../widgets/WidgetCategories'
import normalizeCategory from '../../utils/normalizeCategory'
import normalizeParentCategory from '../../utils/normalizeParentCategory'
import './ProductCategoryPage.scss'

@inject('productsStore', 'productsCategoriesStore')
@observer
class ProductCategoryPage extends Component {
  static propTypes = {
    productsStore: PropTypes.any,
    productsCategoriesStore: PropTypes.any,
    columns: PropTypes.number,
    viewMode: PropTypes.oneOf(['grid', 'grid-with-features', 'list']),
    sidebarPosition: PropTypes.oneOf(['start', 'end']),
    match: PropTypes.shape({
      params: PropTypes.shape({
        categoryId: PropTypes.string
      })
    })
  };

  static defaultProps = {
    columns: 4,
    viewMode: 'grid',
    sidebarPosition: 'start'
  };

  componentDidMount () {
    reaction(() => this.props.match.params.categoryId, async (data) => {
      try {
        this.props.productsStore.getProducts({
          page: 1,
          per_page: this.props.productsStore.countProducts,
          'filter[limit]': this.props.productsStore.countProducts,
          category: normalizeCategory(this.props.match.params.categoryId)
        })
        this.props.productsCategoriesStore.categoryId = normalizeCategory(this.props.match.params.categoryId)
      } catch {
        console.log('error')
      }
    }, { fireImmediately: true })
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

    const offcanvas = (this.props.columns === 3 || this.props.columns === 4) ? 'mobile' : 'always'

    if (this.props.columns > 4) {
      content = (
        <div className='container-fluid'>
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
        <div className='container-fluid'>
          <div className={`shop-layout shop-layout--sidebar--${this.props.sidebarPosition}`}>
            {this.props.sidebarPosition === 'start' && sidebar}
            <div className='shop-layout__content'>
              <div className='block'>
                <ProductsView
                  products={products}
                  layout={this.props.viewMode}
                  grid={`grid-${this.props.columns}-sidebar`}
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
        <Helmet>
          <title>{`Category Page`}</title>
        </Helmet>
        <PageHeader header='Category' breadcrumb={this.breadcrumb} />
        {this.content}
      </React.Fragment>
    )
  }
}

export default ProductCategoryPage
