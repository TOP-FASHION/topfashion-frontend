import * as React from 'react'
import ProductCard from '../../product/ProductCard'

interface Props {
  products?: Array<any>
}

const ProductsList: any = ({ products }: Props) => {
  return products.map(product => (
    <div className='products-list__item' key={product.id}>
      <ProductCard product={product} />
    </div>
  ))
}

export default ProductsList
