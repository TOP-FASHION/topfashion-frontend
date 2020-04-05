import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { inject, observer } from 'mobx-react'
import { reaction, toJS } from 'mobx'
import PageHeader from '../../containers/shared/PageHeader'
import Product from '../../containers/product/Product'
import ProductTabs from '../../containers/product/ProductTabs'
import ProductsCarousel from '../../containers/productList/ProductsCarousel'
import WidgetCategories from '../../containers/widgets/WidgetCategories'
import WidgetProducts from '../../containers/widgets/WidgetProducts'
import normalizeCategory from '../../utils/normalizeCategory'
import './ProductPage.scss'

@inject('productStore', 'productsStore')
@observer
class ProductPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      productsBestsellers: []
    }
  }

  static propTypes = {
    productStore: PropTypes.any,
    productsStore: PropTypes.any,
    layout: PropTypes.oneOf(['standard', 'sidebar', 'columnar', 'quickview']),
    sidebarPosition: PropTypes.oneOf(['start', 'end']),
    match: PropTypes.shape({
      params: PropTypes.shape({
        productId: PropTypes.string
      })
    })
  }

  static defaultProps = {
    layout: 'sidebar',
    sidebarPosition: 'start'
  }

  componentDidMount () {
    reaction(() => this.props.match.params.productId, async () => {
      try {
        this.props.productStore.getProduct(this.props.match.params.productId)
      } catch {
        console.log('error')
      }
    }, { fireImmediately: true })
    this.productsBestsellers()
  }

  componentWillUnmount () {
    this.lastProducts()
  }

  productsBestsellers = async () => {
    const productsBestsellers = await this.props.productsStore.getProducts({
      page: 1,
      per_page: this.props.productsStore.countProducts,
      'filter[limit]': this.props.productsStore.countProducts,
      category: normalizeCategory('bestsellers')
    })
    this.setState(() => ({ productsBestsellers: productsBestsellers }))
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

  get content () {
    const { layout, sidebarPosition } = this.props
    if (layout === 'sidebar') {
      const sidebar = (
        <div className='shop-layout__sidebar'>
          <div className='block block-sidebar'>
            <div className='block-sidebar__item'>
              <WidgetCategories location='shop' />
            </div>
            <div className='block-sidebar__item d-none d-lg-block'>
              <WidgetProducts title='Latest Products' />
            </div>
          </div>
        </div>
      )

      return (
        <div className='container'>
          <div className={`shop-layout shop-layout--sidebar--${sidebarPosition}`}>
            {sidebarPosition === 'start' && sidebar}
            <div className='shop-layout__content'>
              <Product product={this.product} layout={layout} />
              <ProductTabs product={this.product} withSidebar />
              <ProductsCarousel title='Related Products' layout='grid-4-sm' products={this.state.productsBestsellers} withSidebar />
            </div>
            {sidebarPosition === 'end' && sidebar}
          </div>
        </div>
      )
    } else {
      return (
        <React.Fragment>
          <div className='container'>
            <Product product={this.product} layout={this.layout} />
            <ProductTabs product={this.product} />
          </div>
          <ProductsCarousel title='Related Products' layout='grid-5' products={this.state.productsBestsellers} />
        </React.Fragment>
      )
    }
  }

  render () {
    return this.product ? (
      <React.Fragment>
        <Helmet>
          <title>{`Product Page`}</title>
        </Helmet>

        <PageHeader breadcrumb={this.breadcrumb} />
        {this.content}
      </React.Fragment>
    ) : null
  }
}

export default ProductPage
