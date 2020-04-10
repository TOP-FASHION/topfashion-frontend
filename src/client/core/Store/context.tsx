import * as React from 'react'
import ProductsStore from './ProductsStore'
import PostStore from './PostStore'

export function createStores () {
  return {
    productsStore: new ProductsStore(),
    postStore: new PostStore()
  }
}

export const stores = createStores()

export const AppContext = React.createContext(stores)
