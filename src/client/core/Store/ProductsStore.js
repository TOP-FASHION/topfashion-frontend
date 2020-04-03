import { decorate, observable, action, computed, toJS } from 'mobx'
import Api from '../Api'

export default class ProductsStore {
  products = []

  allLoadedProducts = []

  totalProducts

  pagesProducts

  countProducts = 12

  isLoadingProducts = false

  getProducts (data) {
    this.isLoadingProducts = true
    return Api.Woocommerce.Products(data)
      .then((res) => {
        if (res.data) {
          this.isLoadingProducts = false
          this.setProducts(res.data)

          this.totalProducts = res.headers['x-wp-total']
          this.pagesProducts = res.headers['x-wp-totalpages']
          return res.data
        }
      })
  }

  setProducts = data => {
    this.products = data
  }

  get allProducts () {
    this.allLoadedProducts = this.allLoadedProducts.concat(toJS(this.products))
    return this.allLoadedProducts
  }
}

decorate(ProductsStore, {
  products: observable,
  totalProducts: observable,
  pagesProducts: observable,
  countProducts: observable,
  isLoadingProducts: observable,
  setData: action,
  allProducts: computed
})
