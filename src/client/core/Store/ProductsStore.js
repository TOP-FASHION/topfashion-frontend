import { decorate, observable, action } from 'mobx'
import Api from '../Api'

export default class ProductsStore {
  products

  totalProducts

  pagesProducts

  countProducts = 9

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
}

decorate(ProductsStore, {
  products: observable,
  totalProducts: observable,
  pagesProducts: observable,
  countProducts: observable,
  isLoadingProducts: observable,
  setData: action
})
