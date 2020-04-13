import * as React from 'react'
import { Helmet } from 'react-helmet'
import { observer } from 'mobx-react'
import { reaction, toJS } from 'mobx'
import { AppContext } from '../../core/Store/context'
import PageHeader from '../../containers/shared/PageHeader'
import Product from '../../containers/product/Product'
import ProductTabs from '../../containers/product/ProductTabs'
import ProductsCarousel from '../../containers/productList/ProductsCarousel'
// import WidgetCategories from '../../containers/widgets/WidgetCategories'
// import WidgetProducts from '../../containers/widgets/WidgetProducts'
import normalizeCategory from '../../utils/normalizeCategory'
import './ProductPage.scss'

interface Props {
  layout?: 'standard' | 'sidebar' | 'columnar' | 'quickview',
  sidebarPosition?: 'start' | 'end',
  match?: any
}

const ProductPage = observer(({ layout = 'sidebar', sidebarPosition = 'start', match }: Props) => {
  const { productStore, productsStore } = React.useContext(AppContext)
  const [productsBestsellers, setProductsBestsellers] = React.useState([])
  const { product }: any = productStore

  React.useEffect(() => {
    reaction(() => match.params.productId, async () => {
      try {
        productStore.getProduct(match.params.productId)
      } catch {
        console.log('error')
      }
    }, { fireImmediately: true })
  }, [])

  React.useEffect(() => {
    const getBestsellers = async () => {
      const itemsBestsellers = await productsStore.getProducts({
        page: 1,
        per_page: productsStore.countProducts,
        'filter[limit]': productsStore.countProducts,
        category: normalizeCategory('bestsellers')
      })
      setProductsBestsellers(itemsBestsellers)
    }
    getBestsellers()
    // lastProducts()
  }, [])

  const lastProducts = () => {
    const lastProducts = window.localStorage.getItem('lastProducts')

    if (lastProducts) {
      const objLastProducts = JSON.parse(lastProducts)
      let isAdd = true
      const arr = objLastProducts

      Object.keys(objLastProducts).map(item => {
        const itemLastProduct = objLastProducts[item]
        Object.keys(itemLastProduct).map(item => {
          if (itemLastProduct.id === product.id) {
            isAdd = false
          }
        })
      })
      // eslint-disable-next-line no-unused-expressions
      isAdd ? arr.unshift(toJS(product)) : null
      // eslint-disable-next-line no-unused-expressions
      isAdd ? window.localStorage.setItem('lastProducts', JSON.stringify(arr.slice(0, 5))) : null
    } else {
      window.localStorage.setItem('lastProducts', JSON.stringify([product]))
    }
  }

  const breadcrumb = [
    { title: 'Home', url: '' },
    { title: 'Screwdrivers', url: '' },
    { title: 'product.name', url: '' }
  ]

  const content = () => {
    if (layout === 'sidebar') {
      const sidebar = (
        <div className='shop-layout__sidebar'>
          <div className='block block-sidebar'>
            <div className='block-sidebar__item'>
              {/*
              <WidgetCategories location='shop' />
              */}
            </div>
            <div className='block-sidebar__item d-none d-lg-block'>
              {/*
              <WidgetProducts title='Latest Products' />
              */}
            </div>
          </div>
        </div>
      )

      return (
        <div className='container'>
          <div className={`shop-layout shop-layout--sidebar--${sidebarPosition}`}>
            {sidebarPosition === 'start' && sidebar}
            <div className='shop-layout__content'>
              <Product product={product} layout={layout} />
              <ProductTabs product={product} withSidebar />
              <ProductsCarousel title='Related Products' layout='grid-4-sm' products={productsBestsellers} withSidebar />
            </div>
            {sidebarPosition === 'end' && sidebar}
          </div>
        </div>
      )
    } else {
      return (
        <React.Fragment>
          <div className='container'>
            <Product product={product} layout={layout} />
            <ProductTabs product={product} />
          </div>
          <ProductsCarousel title='Related Products' layout='grid-5' products={productsBestsellers} />
        </React.Fragment>
      )
    }
  }

  return product ? (
    <React.Fragment>
      <Helmet>
        <title>{`Product Page`}</title>
      </Helmet>

      <PageHeader breadcrumb={breadcrumb} />
      {content()}
    </React.Fragment>
  ) : null
})

export default ProductPage
