import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import { Helmet } from 'react-helmet';
// import PageHeader from '../../containers/PageHeader'
import Product from '../../containers/Product'
// import ProductTabs from './ProductTabs'
// import BlockProductsCarousel from '../blocks/BlockProductsCarousel'
// import WidgetCategories from '../widgets/WidgetCategories'
// import WidgetProducts from '../widgets/WidgetProducts'
// import categories from '../../data/shopWidgetCategories'

import { inject, observer } from 'mobx-react/index'

@inject('productsStore')
@observer
class ProductPage extends Component {
  static propTypes = {
    layout: PropTypes.oneOf(['standard', 'sidebar', 'columnar', 'quickview']),
    sidebarPosition: PropTypes.oneOf(['start', 'end'])
  }

  static defaultProps = {
    layout: 'standard',
    sidebarPosition: 'start'
  }

  get breadcrumb () {
    return [
      { title: 'Home', url: '' },
      { title: 'Screwdrivers', url: '' },
      { title: product.name, url: '' }
    ]
  }

  get products () {
    return this.props.productsStore.products
  }

  get layout () {
    return this.props.layout
  }

  get product () {
    return this.props.match.params.productId
      ? this.products.find(
        x => x.id === parseFloat(this.props.match.params.productId)
      )
      : this.products[this.products.length - 1]
  }

  get content () {
    if (this.layout === 'sidebar') {
      // const sidebar = (
      //   <div className="shop-layout__sidebar">
      //     <div className="block block-sidebar">
      //       <div className="block-sidebar__item">
      //         <WidgetCategories categories={categories} location="shop" />
      //       </div>
      //       <div className="block-sidebar__item d-none d-lg-block">
      //         <WidgetProducts title="Latest Products" products={products.slice(0, 5)} />
      //       </div>
      //     </div>
      //   </div>
      // );
      //
      // return (
      //   <div className="container">
      //     <div className={`shop-layout shop-layout--sidebar--${sidebarPosition}`}>
      //       {sidebarPosition === 'start' && sidebar}
      //       <div className=" shop-layout__content">
      //         <div className=" block">
      //           <Product product={product} layout={layout} />
      //           <ProductTabs withSidebar />
      //         </div>
      //
      //         <BlockProductsCarousel title="Related Products" layout="grid-4-sm" products={products} withSidebar />
      //       </div>
      //       {sidebarPosition === 'end' && sidebar}
      //     </div>
      //   </div>
      // );
    } else {
      return (
        <React.Fragment>
          <div className='block'>
            <div className='container'>
              <Product product={this.product} layout={this.layout} />
              {/* <ProductTabs /> */}
            </div>
          </div>
          {/* <BlockProductsCarousel title="Related Products" layout="grid-5" products={products} /> */}
        </React.Fragment>
      )
    }
  }

  render () {
    return (
      <React.Fragment>
        {/* <PageHeader breadcrumb={this.breadcrumb} /> */}
        {this.content}
      </React.Fragment>
    )
  }
}

export default ProductPage
