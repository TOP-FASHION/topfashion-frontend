import * as React from 'react'
import { observer } from 'mobx-react'
import { injectIntl } from 'react-intl'
import ProductsCarousel from '../ProductsCarousel'

interface Props {
  title: string,
  layout?: 'grid-4' | 'grid-4-sm' | 'grid-5' | 'horizontal',
  rows: number,
  withSidebar?: boolean,
  products?: any
}

const ProductsCarouselTabbs = observer(({ layout = 'grid-4', rows = 1, withSidebar = false, products, ...otherProps }: Props) => {
  return products ? (
    <ProductsCarousel
      {...otherProps}
      products={products}
    />
  ) : null
})

export default injectIntl(ProductsCarouselTabbs)
