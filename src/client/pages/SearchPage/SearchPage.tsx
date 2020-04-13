import * as React from 'react'
import { Redirect } from 'react-router-dom'
// import { Helmet } from 'react-helmet'
import { observer } from 'mobx-react'
import { AppContext } from '../../core/Store/context'
import PageHeader from '../../containers/shared/PageHeader'
import ProductsView from '../../containers/productList/ProductsView/ProductsView'

interface Props {
  columns?: number,
  viewMode?: 'grid' | 'grid-with-features' | 'list',
  match?: any
}

const SearchPage = observer(({ columns = 5, viewMode = 'grid', match }: Props) => {
  const { productSearchStore } = React.useContext(AppContext)

  const breadcrumb = [
    { title: 'Home', url: '' },
    { title: 'Search', url: '' }
  ]

  const content = () => {
    return (
      <React.Fragment>
        <div className='container'>
          <div className='block'>
            <ProductsView
              products={productSearchStore.productBySearch}
              layout={viewMode}
              grid={`grid-${columns}-full`}
              limit={15}
              offcanvas='mobile'
            />
          </div>
        </div>
      </React.Fragment>
    )
  }

  return productSearchStore.productBySearch ? (
    <React.Fragment>
      <PageHeader breadcrumb={breadcrumb} />
      {content}
    </React.Fragment>
  ) : <Redirect to='/' />
})

export default SearchPage
