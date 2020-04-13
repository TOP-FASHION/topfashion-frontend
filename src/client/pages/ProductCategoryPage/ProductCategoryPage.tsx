import * as React from 'react'
import { Helmet } from 'react-helmet'
import { reaction } from 'mobx'
import { observer } from 'mobx-react'
import { AppContext } from '../../core/Store/context'
import PageHeader from '../../containers/shared/PageHeader'
import ProductsView from '../../containers/productList/ProductsView'
import CategorySidebar from '../../containers/product/CategorySidebar'
// import WidgetCategories from '../widgets/WidgetCategories'
import normalizeCategory from '../../utils/normalizeCategory'
import normalizeParentCategory from '../../utils/normalizeParentCategory'
import './ProductCategoryPage.scss'

interface Props {
  columns?: number,
  viewMode?: 'grid' | 'grid-with-features' | 'list',
  sidebarPosition?: 'start' | 'end',
  match?: any
}

const ProductCategoryPage = observer(({ columns = 4, viewMode = 'grid', sidebarPosition = 'start', match }: Props) => {
  const { productsStore, productsCategoriesStore } = React.useContext(AppContext)

  React.useEffect(() => {
    reaction(() => match.params.categoryId, async (data) => {
      try {
        productsStore.getProducts({
          page: 1,
          per_page: productsStore.countProducts,
          'filter[limit]': productsStore.countProducts,
          category: normalizeCategory(match.params.categoryId)
        })
        productsCategoriesStore.categoryId = normalizeCategory(match.params.categoryId)
      } catch {
        console.log('error')
      }
    }, { fireImmediately: true })
  }, [])

  const breadcrumb = [
    { title: 'Home', url: '' },
    { title: 'Category', url: '/category' },
    { title: normalizeParentCategory(match.params.categoryId), url: normalizeParentCategory(match.params.categoryId) },
    { title: match.params.categoryId, url: match.params.categoryId }
  ]

  const content = () => {
    const { products } = productsStore
    let content

    const offcanvas = (columns === 3 || columns === 4) ? 'mobile' : 'always'

    if (columns > 4) {
      content = (
        <div className='container-fluid'>
          <div className='block'>
            <ProductsView
              products={products}
              layout={viewMode}
              grid={`grid-${columns}-full`}
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
          <div className={`shop-layout shop-layout--sidebar--${sidebarPosition}`}>
            {sidebarPosition === 'start' && sidebar}
            <div className='shop-layout__content'>
              <div className='block'>
                <ProductsView
                  products={products}
                  layout={viewMode}
                  grid={`grid-${columns}-sidebar`}
                  limit={15}
                  offcanvas={offcanvas}
                />
              </div>
            </div>
            {sidebarPosition === 'end' && sidebar}
          </div>
        </div>
      )
    }
    return content
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>{`Category Page`}</title>
      </Helmet>
      <PageHeader header={match.params.categoryId || 'Category'} breadcrumb={breadcrumb} />
      {content}
    </React.Fragment>
  )
})

export default ProductCategoryPage
