import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import { Helmet } from 'react-helmet';
import PageHeader from '../../containers/shared/PageHeader'
import Product from '../../containers/shared/Product'
import ProductTabs from '../../containers/shared/ProductTabs'
// import BlockProductsCarousel from '../blocks/BlockProductsCarousel'
// import WidgetCategories from '../widgets/WidgetCategories'
// import WidgetProducts from '../widgets/WidgetProducts'
// import categories from '../../data/shopWidgetCategories'

import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'

@inject('productStore')
@observer
class ProductPage extends Component {
  static propTypes = {
    productStore: PropTypes.any,
    layout: PropTypes.oneOf(['standard', 'sidebar', 'columnar', 'quickview']),
    // sidebarPosition: PropTypes.oneOf(['start', 'end']),
    match: PropTypes.shape({
      params: PropTypes.shape({
        productId: PropTypes.string
      })
    })
  }

  static defaultProps = {
    layout: 'standard',
    sidebarPosition: 'start'
  }

  componentDidMount () {
    this.props.productStore.getProduct(this.props.match.params.productId)
  }

  componentWillUnmount () {
    this.lastProducts()
  }

  lastProducts () {
    const lastProducts = window.localStorage.getItem('lastProducts')

    if (lastProducts) {
      const objLastProducts = JSON.parse(lastProducts)
      let isAdd = true
      const arr = objLastProducts

      Object.keys(objLastProducts).map(item => {
        const itemLastProduct = objLastProducts[item]
        Object.keys(itemLastProduct).map(item => {
          if (itemLastProduct.id === this.product.id) {
            isAdd = false
          }
        })
      })
      // eslint-disable-next-line no-unused-expressions
      isAdd ? arr.unshift(toJS(this.product)) : null
      // eslint-disable-next-line no-unused-expressions
      isAdd ? window.localStorage.setItem('lastProducts', JSON.stringify(arr.slice(0, 5))) : null
    } else {
      window.localStorage.setItem('lastProducts', JSON.stringify([this.product]))
    }
  }

  get breadcrumb () {
    return [
      { title: 'Home', url: '' },
      { title: 'Screwdrivers', url: '' },
      { title: this.product.name, url: '' }
    ]
  }

  get products () {
    return this.props.productStore.product
  }

  get product () {
    return this.props.productStore.product
  }

  get layout () {
    return this.props.layout
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
      return ''
    } else {
      return (
        <React.Fragment>
          <div className='block'>
            <div className='container'>
              <Product product={this.product} layout={this.layout} />
              <ProductTabs product={this.product} />
            </div>
          </div>
          {/* <BlockProductsCarousel title="Related Products" layout="grid-5" products={products} /> */}
        </React.Fragment>
      )
    }
  }

  render () {
    return this.product ? (
      <React.Fragment>
        <PageHeader breadcrumb={this.breadcrumb} />
        {this.content}
      </React.Fragment>
    ) : null
  }
}

export default ProductPage
